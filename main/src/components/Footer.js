import React from 'react';

import '../styles/footer.scss';

export default function Footer() {
    return (
        <div>
            <footer>
                <div className="moFooter">
                    <a href="/">
                        <div className="flogo">ODD</div>
                    </a>
                    <div className="fCopy">&#169; 2024 ODD. All Rights Reserved.</div>
                    <div className="fTel">
                        <div className="ftTit">고객센터 CodingOn &#40;발신자 부담&#41;</div>
                        <div className="ftText">평일 09:00~14:00 &#47; 일요일, 공휴일 휴무</div>
                    </div>
                </div>
                <div className="pcFooter">
                    <div className="fLeft">
                        <a href="/">
                            <div className="flogo">ODD</div>
                        </a>
                        <div className="fTel">
                            <div className="ftTit">고객센터 CodingOn</div>
                            <div className="ftText">
                                발신자 부담
                                <br />
                                평일 09:00~18:00
                                <br />
                                일요일, 공휴일 휴무
                            </div>
                        </div>
                    </div>
                    <div className="fRight">
                        <div className="fText">
                            <span>박시영</span>
                            <span>프로젝트 기간 2024.03.25 ~ 2024.04.16</span>
                            <a href="https://github.com/cci0/DN">
                                <span>GitHub ODD</span>
                            </a>
                            <span>(본사) 서울시 마포구 숭문 4길 6, 지하 1층 포스코X코딩온 교육장</span>
                            <span>React-Calendar</span>
                        </div>
                        <div className="fMenu">
                            <p>이용약관</p>
                            <p className="tcbl">개인정보처리방침</p>
                        </div>
                        <div className="fCopy">&#169; 2024 ODD. All Rights Reserved.</div>
                    </div>
                </div>
            </footer>

            <link rel="stylesheet" href="" />
        </div>
    );
}
