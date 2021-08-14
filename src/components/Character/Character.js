const Character = props => {
    let statusColor;
    if (props.status.toLowerCase().includes("dead") || props.status.toLowerCase().includes("deceased")) {
        statusColor = "text-spoiler-red";
    } else {
        statusColor = "text-primary";
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center w-11/12 lg:w-8/12 rounded-2xl bg-secondary my-2 
        px-4 lg:px-6 py-5 lg:py-7 border border-transparent hover:border-primary transition duration-200 ease-in
        cursor-pointer">
            {/* Image */}
            <div className="hidden lg:block lg:h-20 lg:w-20 rounded-full mr-5 overflow-hidden">
                <img src={props.image} alt="Character" />
            </div>

            {/* Info container */}
            <div className="flex flex-col justify-around space-y-2 lg:space-y-3">
                <h3 className="text-md lg:text-xl text-primary font-semibold">
                    {props.name}
                </h3>
                <p className="text-sm lg:text-lg text-gray-400">
                    {props.occupation}
                </p>
                <p className="text-sm lg:text-lg text-gray-400">
                    Born: {props.birthday}
                </p>
            </div>

            {/* Status */}
            <div className="flex lg:justify-end flex-1 mt-5 lg:my-0">
                <p className={`text-sm lg:text-xl px-4 py-2 lg:py-3 ${statusColor} font-semibold bg-bg rounded-full`}>
                    {props.status}
                </p>
            </div>
        </div>
    );
}

export default Character;