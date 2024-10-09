
const {  useState } = React
export function LongTxt({ text, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div>
            {isExpanded ? text : `${text.slice(0, length)}... `}
            <button onClick={toggleReadMore} 
            style={{ marginLeft: '5px', cursor: 'pointer' }}>
                {isExpanded ? 'Read less' : 'Read more'}
            </button>
        </div>
    )

}