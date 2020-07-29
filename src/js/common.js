
/** 페이지바 생성에 필요한 값들 생성 
 * @param pageNo      요청한 페이지 번호
 * @param count       총 row 수
 * @param pagePerSize 한페이지에 표시할 게시글 수
 */
function makePageData(pageNo, count, pagePerSize) {
    // 총 페이지 수
    const totalPages =
        count % pagePerSize != 0
            ? Math.floor(count / pagePerSize) + 1
            : count / pagePerSize;
    // console.log("[totalPages] : ", totalPages);

    // 첫페이지 여부
    let isFirst = pageNo != 0 ? false : true;

    // 마지막페이지 여부
    let isLast = pageNo != totalPages - 1 ? false : true;

    if (count == 0) {
        isLast = true;
    }

    // 시작번호
    let startPage = Math.floor(pageNo / 10) * 10 + 1;

    // 마지막번호
    let endPage = totalPages > startPage + 9 ? startPage + 9 : totalPages;

    // 페이지 번호 배열
    let pageBtns = [];
    for (let i = startPage; i <= endPage; i++) {
        pageBtns.push(i);
    }

    return {
        totalPages,
        isFirst,
        isLast,
        totalRowCount: count,
        pagePerSize,
        currentPage: pageNo + 1,
        startPage,
        endPage,
        pageBtns,
    };
}
/**
 * 입력한 날짜를 호출에 맞도록 수정하여 return
 * @param date 선택한 날짜.
 */
function makeDate(date) {
    let dateMake = new Date(date);
    let year = dateMake.getFullYear();
    let month = dateMake.getMonth() + 1;
    let day = dateMake.getDate();

    if (month < 10) {
        month = '0' + month.toString();
    }

    if (day < 10) {
        day = '0' + day.toString();
    }

    return year.toString() + month.toString() + day.toString();
}
/**
 * 
 */
function makeDatehhmmss(sec){
    let h = parseInt(sec / 60 / 60 % 60);
    let m = parseInt(sec / 60 % 60);
    let s = parseInt(sec % 60);

    if (m <= 9) {
        m = '0' + m;
    }

    if (s <= 9) {
        s = '0' + s;
    }
    return (h + ':' + m + ':' + s);
}

export {
    makePageData,
    makeDate,
    makeDatehhmmss
}