const Button = props => (
    <button
        className="py-2 px-4 bg-secondary rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

export default Button;