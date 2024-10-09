
const {  useState } = React
export function LongTxt({ text, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div>
            {isExpanded ? text : `${text.slice(0, length)}... `}
            <a onClick={toggleReadMore} 
            style={{ cursor: 'pointer' }}>
                {isExpanded ? 'Read less' : 'Read more'}
            </a>
        </div>
    )

}