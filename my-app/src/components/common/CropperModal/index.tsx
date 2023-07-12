import {ChangeEvent, FC, LegacyRef, useEffect, useRef, useState} from "react";
import {ICropperModal} from "./types";
import classNames from "classnames";
import selectImage from "../../../assets/default.jpg";
import {Modal} from "bootstrap";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import "./style.scss";

const CropperModal: FC<ICropperModal> = ({
                                             onChange,
                                             field,
                                             error,
                                             touched,
                                             value,
                                             aspectRatio = 1 / 1
                                         }) => {
    //Модальне вікно
    const modalRef = useRef(null);
    //Фото, яке ми побрізаємо
    const imgRef = useRef<HTMLImageElement>(null);
    //Попердній перегляд фото при обрізці
    const imgPrevRef = useRef<HTMLImageElement>(null);
    const [image, setImage] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    const [cropperObj, setCropperObj] = useState<Cropper>();
    const toggleModal = async () => {
        await setShow((prev)=>!prev);
    }

    const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (files[0] === undefined) return;
            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
            if (!allowedTypes.includes(file.type)) {
                alert("Недопустимий тип файлу")
                return;
            }
            const url = URL.createObjectURL(file);
            await toggleModal();
            await setImage(url);
            cropperObj?.replace(url);
        }
    }

    useEffect(() => {
        if(imgRef.current) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                viewMode: 1,
                aspectRatio: aspectRatio,
                preview: imgPrevRef.current as HTMLImageElement
            });
            setCropperObj(cropper);
        }
    },[]);
    return (
        <>
            <div className="mb-3">
                <label htmlFor="image">
                    Фото
                    <img
                        src={value == null ? selectImage : URL.createObjectURL(value)}
                        width="200"
                        style={{objectFit: "contain", display: 'block', cursor: 'pointer'}}
                        alt="ФОТОГРАФІЯ"
                        className={classNames(
                            "img-thumbnail d-block",
                            {"border border-danger-subtle": error !== ""}
                        )}
                    />
                </label>

                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/jpeg, image/png, image/gif" // обмеження для файлу
                    className="d-none"
                    onChange={onChangeImage}
                    placeholder="Вкажіть фото"
                />

                {error !== "" && (
                    <span className={"d-block invalid-feedback"}>{error}</span>
                )}
            </div>

            <div className={classNames("modal", { "custom-modal": show })}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Редагування фото</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8 col-lg-9">
                                    <div className="d-flex justify-content-center">
                                        <img src={image} alt="Вибрана фотка" width="100%"
                                             ref={imgRef as LegacyRef<HTMLImageElement>} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-3">
                                    <div className="d-flex justify-content-center">
                                        <div
                                            ref={imgPrevRef as LegacyRef<HTMLImageElement>}
                                            style={{
                                                height: "150px",
                                                width: "150px",
                                                border: "1px solid silver",
                                                overflow: "hidden",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CropperModal;
