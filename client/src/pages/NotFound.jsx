const NotFound = () => {

    return (
      <>
        <div className="text-center flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}illustartion/404_adobe_express.svg`}
            className="w-4/5 md:w-1/2 m-2"
            alt="NOT FOUND"
          />
        </div>
      </>
    );
  };
  
  export default NotFound;
  