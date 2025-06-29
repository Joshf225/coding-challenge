function CustomToast() {
  return (
    // using a grid with 3 columns
    <div className="w-full">
      <div className="flex p-4 w-full">
        You may experience a long waiting period when using this app, this is
        because I'm using a free service to host my backend/api. Just give it up
        to 30sec max and then refresh and try again if you get no response.
        Thanks for joining me on this journey to Mars!!
      </div>
    </div>
  );
}

export default CustomToast;
