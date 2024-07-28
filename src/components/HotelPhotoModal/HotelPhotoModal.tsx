import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction} from "react";
import {FieldValues, useForm} from "react-hook-form";

import {baseURL, urls} from "../../constants";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    objName: string,
    photosIds: string[],

    addAction: (photos: FormData) => void,
    deleteAction: (photoUrl: string) => void
}

const HotelPhotoModal: FC<IProp> = ({show, setShow, objName, photosIds, addAction, deleteAction}) => {
    const {register, handleSubmit, reset, formState: {isValid}} = useForm();

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (data: FieldValues) => {
        const formData = new FormData();
        [...data.photos].forEach((photo: any) => {
            formData.append("photos", photo)
        })
        console.log('1')
        addAction(formData)
        reset()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Photos of {objName}</Modal.Title>
            </Modal.Header>
            {photosIds.length > 0 &&
                <Modal.Body>
                    <div className="d-flex flex-wrap">
                        {photosIds.map(photoId =>
                            <div
                                className="d-flex justify-content-center align-items-center bg-dark rounded position-relative me-1 mt-1"
                                style={{width: '150px', height: '150px'}}>
                                <img src="https://placehold.co/20x20/red/white?text=X" alt="Delete"
                                     title="Delete photo" className="bg-danger rounded-circle"
                                     style={{position: 'absolute', top: '2px', right: '2px', cursor: 'pointer'}}
                                     onClick={() => deleteAction(photoId)}/>
                                <img src={`${baseURL}${urls.photos.byId(photoId)}`} alt={objName}
                                     style={{maxHeight: '100%', maxWidth: '100%', display: 'block'}}/>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            }
            <Modal.Footer className="justify-content-start">
                <form onSubmit={handleSubmit(handleForm)}>
                    <Form.Group>
                        <Form.Control type="file" accept="image/png, image/jpeg" multiple
                                      {...register("photos", { required: true })}/>
                        <Button className="mt-1" type="submit" variant="success" disabled={!isValid}>Upload</Button>
                    </Form.Group>
                </form>
            </Modal.Footer>
        </Modal>
    );
};

export {
    HotelPhotoModal
}