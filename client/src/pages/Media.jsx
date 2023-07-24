

function Media() {


    const images = [
        'https://www.vidyamandir.com/assets/images/courses-panel/classroom.jpg',
        'https://www.vidyamandir.com/assets/images/courses-panel/live-classes.jpg',
        'https://www.vidyamandir.com/assets/images/courses-panel/classroom.jpg',
        'https://www.vidyamandir.com/assets/images/courses-panel/live-classes.jpg',

    ];
    return (
        <div className="bg-[#d1e9f9] py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-black-800  text-center">IPEC MEDIA </h2>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="bg-white overflow-hidden shadow rounded-lg mx-4 my-4">
                            <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-72 object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Media;
