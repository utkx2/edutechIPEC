import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../../../config';


export default function FacultyPhotoUploader({ photos, onChange, index }) {

    const [photoslink, setPhotoslink] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    function uploadPhoto(ev) {
        ev.preventDefault();
        const files = ev.target.files;
        console.log(files);
        const data = new FormData();
        for (let file of files) {
            data.append('photos', file);
        }
        console.log(data);
        axios.post(`${BASE_URL}home/uploadImage`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setPhotoslink(filenames[0]);
            console.log(filenames[0]);
            console.log(photos);
            photos.facultyImg = filenames[0];
            console.log(photos.facultyImg);
            console.log(photos);
            setMessage("photo updated ");
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        })
    }


    return (
        <>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6  ">

                <label className="h-16 w-32 cusor-pointer flex border-2 bg-transparent rounded-2xl p-2  items-center text-2xl text-gray-600 justify-center  ">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    upload
                </label>

            </div>
            {
                message && showMessage && (
                    <p>
                        {message}
                    </p>
                )
            }
        </>
    )
}

FacultyPhotoUploader.propTypes = {
    photos: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};