import { Table } from 'react-bootstrap'

function Cart() {
    return (
        <div>
            <Table>
                {/* <thead> → 제목(구분) */}
                <thead>
                    {/* <tr> → 행 */}
                    <tr>
                        {/* <th> 또는 <td> → 열 */}
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                {/* <tbody> → 제목에 따른 값(실제 내용) */}
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>안녕</td>
                        <td>안녕</td>
                        <td>안녕</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Cart