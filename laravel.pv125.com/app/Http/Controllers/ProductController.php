<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Validator;
class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\Response(response="200", description="Get All Products.")
     * )
     */
    public function index()
    {
        $products = Product::with('product_images')->get();

        return response()->json($products, 200, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"category_id","name","price","description","images[]"},
     *                 @OA\Property(
     *                     property="category_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="images[]",
     *                     type="array",
     *                     @OA\Items(type="string", format="binary")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Product.")
     * )
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'images' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $images = $request->file('images');
        $product = Product::create($input);
        if ($request->hasFile('images')) {
            $i=1;
            foreach ($images as $image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $priority = $i++;
                $image->move(public_path('uploads/product'), $filename);
                ProductImage::create([
                    'product_id' => $product->id,
                    'name' => $filename,
                    'priority' => $priority,
                ]);
            }
        }

        $product->load('product_images');

        return response()->json($product, 200, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/product/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Product ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="200", description="Get a Product.")
     * )
     */
    public function getByid($id)
    {
        $product = Product::with('product_images')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404, [
                'Content-Type' => 'application/json;charset=UTF-8',
                'Charset' => 'utf-8'
            ], JSON_UNESCAPED_UNICODE);
        }

        return response()->json($product, 200, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product/edit/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Product ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"category_id","name","price","description","images"},
     *                 @OA\Property(
     *                     property="category_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="images",
     *                     type="array",
     *                     @OA\Items(type="string", format="binary")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Update a Product.")
     * )
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404, [
                'Content-Type' => 'application/json;charset=UTF-8',
                'Charset' => 'utf-8'
            ], JSON_UNESCAPED_UNICODE);
        }

        $input = $request->all();
        $message = [
            'category_id.required' => "Specify the category",
            'name.required' => "Specify the name",
            'price.required' => "Specify the price",
            'description.required' => "Specify the description",
            'images.required' => "Select at least one image",
        ];

        $validator = Validator::make($input, [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'images' => 'required',

        ], $message);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400, [
                'Content-Type' => 'application/json;charset=UTF-8',
                'Charset' => 'utf-8'
            ], JSON_UNESCAPED_UNICODE);
        }
        $productImages = $product->product_images;
        foreach ($productImages as $productImage) {
            // Delete the file
            $filePath = public_path('uploads/product/' . $productImage->name);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }
        $product->update($input);

        if ($request->hasFile('images')) {
            $images = $request->file('images');

            foreach ($images as $key => $image) {
                // Generate a unique filename
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $priority = $key; // Use the key as the priority value

                // Save the image
                $path = public_path('uploads/product/' . $filename);
                $image->move(public_path('uploads/product'), $filename);

                // Delete the previous image if exists
                if ($product->images[$key] && file_exists(public_path('uploads/product/' . $product->images[$key]->name))) {
                    unlink(public_path('uploads/product/' . $product->images[$key]->name));
                }

                // Create or update the product image record
                $product->images()->updateOrCreate(
                    ['priority' => $priority],
                    ['name' => $filename]
                );
            }
        }

        $product->load('category', 'images');

        return response()->json($product, 200, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * @OA\Delete(
     *     tags={"Product"},
     *     path="/api/product/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Product ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="204", description="Delete a Product.")
     * )
     */
    public function delete($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404, [
                'Content-Type' => 'application/json;charset=UTF-8',
                'Charset' => 'utf-8'
            ], JSON_UNESCAPED_UNICODE);
        }
        $productImages = $product->product_images;
        foreach ($productImages as $productImage) {
            // Delete the file
            $filePath = public_path('uploads/product' . $productImage->name);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }

        $product->delete();

        return response()->json(null, 204, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }

}
