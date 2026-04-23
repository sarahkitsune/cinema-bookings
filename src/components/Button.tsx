/**
 * Button component
 * the "onclick" event can be set by the parent component
 * @param onClick - function to be called when the button is clicked
 * @returns a button element
 */
export default function Button({ onClick, text }: { onClick?: () => void; text?: string }) {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};
	
	return (
		<button className="horus bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
			{text || "Click Me"}
		</button>
	);
}