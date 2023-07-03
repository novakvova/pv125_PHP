<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/category", [CategoryController::class, "index"]);
Route::post("/category", [CategoryController::class, "store"]);
Route::post("/category/edit/{id}", [CategoryController::class, "update"]);
Route::delete("/category/{id}", [CategoryController::class, "delete"]);
Route::get("/category/{id}", [CategoryController::class, "getById"]);


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::get("/product", [ProductController::class, "index"]);
Route::post("/product", [ProductController::class, "store"]);
Route::post("/product/edit/{id}", [ProductController::class, "update"]);
Route::delete("/product/{id}", [ProductController::class, "delete"]);
Route::get('/product/{id}', [ProductController::class, "getByid"]);
