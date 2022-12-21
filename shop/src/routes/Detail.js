import { useParams } from "react-router-dom";

function Detail(props) {

    // 유저가 URL 파라미터에 입력한 값을 가져오려면 useParams() 사용
    // 경로 뒤 작명한 이름을 가져옴
    let {id} = useParams();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (parseInt(id)+1) +".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    {/* props.shoes[현재 URL에 입력된 숫자]로 설정하면 여러 페이지 출력 가능 */}
                    <h4 className="pt-5">{ props.shoes.find(shoes => shoes.id === parseInt(id)).title }</h4>
                    <p>{ props.shoes.find(shoes => shoes.id === parseInt(id)).content }</p>
                    <p>{ props.shoes.find(shoes => shoes.id === parseInt(id)).price }원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    );
}

export default Detail;