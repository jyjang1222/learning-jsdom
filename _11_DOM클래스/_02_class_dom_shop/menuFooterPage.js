

export class MenuFooterPage{

    excute(data){
        var $tag = document.querySelector("#footer");  
        var tag = "";
        tag += 
        `
        <div align="center">
            <hr size="1" color="lightgray">

            <table>
                <tr height="50px">
                    <td rowspan="2" width="50px" align="center">
                        <img  src="img/logo_gary.png" width="100px">
                    </td>
                    <td rowspan="2" width="10px">
                    </td>
                    <td rowspan="2" width="280px">
                        <font size="4" color="gray">
                            <b>잇북프로젝트</b><br>
                        </font>
                        <font size="1" color="gray">
                            경기도 안산시 단원구 중앙대로 921, 3층(동서코아)<br>
                            팀명 : 짱쎈알파조 프로젝트 주제 : IT전문 문고<br>
                            Server : Tomcat v9.0 Server at localhost<br>
                            Copyright ⓒ IT BOOK. All Rights Reserved.
                        </font>
                    </td>
                    <td colspan="4" align="left">
                        <font size="4"  color="gray"><b>고객문의</b></font><br>
                        <font size="2"  color="gray">
                            <b>일반문의</b> qwer@itbook.com
                            <b>1:1문의</b> abcd@itbook.com
                        </font>
                    </td>
                </tr>
                <tr>
                    <td width="35px" align="center">
                        <img align="left"  src="img/05_bottom2.png" width="25px">
                    </td>
                    <td width="150px">
                        <font size="1" color="gray">
                            개인정보보호 우수 웹사이트 <br>
                            개인정보처리시스템 인증<br>(ePRIVACY PLUS)	
                        </font>
                    </td>
                    <td width="90px" align="center">
                        <img align="left" alt="페이먼츠" src="img/05_bottom3.png" width="80px">
                    </td>
                    <td width="280px">
                        <font size="1" color="gray">
                            고객님의 안전거래를 위해 현금 등으로 결제 시<br>
                            저희 쇼핑몰에서 가입한 토스 페이먼츠 구매안전(에스크로)<br>
                            서비스를 이용하실 수 있습니다.	
                        </font>
                    </td>
                </tr>
            </table>
        </div>
        `;
        $tag.innerHTML = (tag);
    }
}