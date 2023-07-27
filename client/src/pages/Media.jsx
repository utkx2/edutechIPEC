function Media() {


    const images = [
        'https://www.vidyamandir.com/assets/images/courses-panel/classroom.jpg',
        'https://www.vidyamandir.com/assets/images/courses-panel/live-classes.jpg',
        'https://www.vidyamandir.com/assets/images/courses-panel/classroom.jpg',
        'https://www.vidyamandir.com/assets/images/courses-panel/live-classes.jpg',
    ];
    return (
        <div className="bg-[#d1e9f9] py-10">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-black-8 00">IPEC MEDIA </h2>
                <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="mx-4 my-4 overflow-hidden bg-white rounded-lg shadow">
                            <img src={imageUrl} alt={`Image ${index + 1}`} className="object-cover w-full h-72" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Media;
