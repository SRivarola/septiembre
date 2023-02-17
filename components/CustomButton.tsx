const CustomButton = ({label}:any) => {
  return (
    <div className="flex justify-center my-4">
      <button
        type="submit"
        className="py-2 px-8 font-semibold border-2 transition-all ease-out duration-500 rounded border-secondary text-secondary hover:bg-secondary hover:text-primary"
      >
        { label } 
      </button>
    </div>
  )
}

export default CustomButton