export default function PrograssBar ({ prograss, onClick }){
    return (
        <div className="prograss-box">
            <div className="prograss-container" onClick={onClick}></div>
            <div className="prograss-bar" style={{width: `${prograss}%`}}></div>
        </div>
    )
}