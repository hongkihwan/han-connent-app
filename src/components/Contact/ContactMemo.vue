<template>
  <div class="uni-mpcjob-contact">
    <div class="contact-select-menu">
        <div class="contact-select-item">
            <span>상담답변</span>
        </div>
    </div>
    <form role="form">
        <table class="ml-2">
            <tr>
                <td>
                    <div style="text-align:left;margin-left:5px;">인입구분</div>
                </td>
                <td>
                    <div style="text-align:left;margin-left:5px;">차량종류</div>
                </td>
            </tr>
            <tr>
                <td class="uni-mpcjob-contact-col1">                        
                    <select id="uni-mpcjob-contact-boutique" class="form-control input-sm">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select id="uni-mpcjob-contact-contactsource" class="form-control">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="text-align:left;margin-left:5px;">통화유형</div>
                </td>
                <td>
                    <div style="text-align:left;margin-left:5px;">통화결과</div>
                </td>
            </tr>
            <tr>
                <td class="uni-mpcjob-contact-col1">                        
                    <select id="uni-mpcjob-contact-boutique" class="form-control input-sm">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select id="uni-mpcjob-contact-contactsource" class="form-control">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
            </tr>
        </table>

        <div style="text-align:left;margin-left:5px;">문의유형</div>
        <table>
            <tr>
                <td class="uni-mpcjob-contact-col1">                        
                    <select id="uni-mpcjob-contact-boutique" class="form-control input-sm">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select id="uni-mpcjob-contact-contactsource" class="form-control">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select id="uni-mpcjob-contact-contactsource" class="form-control">
                        <option value=0>선택하세요</option>
                    </select>
                </td>
            </tr>
        </table>

        <textarea id="uni-mpcjob-contact-detail" style="resize: none;height:120px;margin-bottom:25px;" class="form-control"/>

    </form>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.uni-mpcjob-contact {
    padding: 10px 10px;
    font-size:14px !important;
    text-align:left;
}

.uni-mpcjob-contact table {
    width:100%;
}

.uni-mpcjob-contact table th {
    padding-left:10px;
    padding-right:10px;
    width:70px;
    font-size:12px !important;
}

.uni-mpcjob-contact table td {
    padding-right:10px;
}

.uni-mpcjob-contact .uni-mpcjob-contact-col1 {
    width:200px;
}

.uni-mpcjob-contact textarea {
    width:100%;
    height:150px;    
    margin-top:10px;
}

.uni-mpcjob-contact .contact-select-menu {
    margin-bottom:10px;
    display:inline-flex;
}

.uni-mpcjob-contact .contact-select-item {
    /*background-color:#b8bbe7;*/
    background-color:#f7d97f;
    color:#b19e64 !important;
    border-radius: 15px 15px;
    text-align:left;
    padding:2px 10px 2px 10px;
    font-size:12px !important;
    margin-right:5px;
}

.uni-mpcjob-contact .contact-active-item {
    /*background-color:#939aff !important;
    color:white !important;*/
    background-color:#f2b705 !important;
    color:white !important;
}

.uni-mpcjob-contact .contact-select-item button {
    background-color:rgba(0,0,0,0.08);    
    border:none;
    border-radius: 15px 15px;
    height:17px;
    width:17px;
    font-size:5px !important;
    color:#ffffff;
    position: relative;
    left:5px;
}

.uni-mpcjob-contact .contact-add-btn {
    background-color:#f7d97f;
    border:none;
    border-radius: 15px 15px;
    height:23px;
    width:23px;
    font-size:12px !important;
    color:#b19e64;
    margin-left:0px;
    padding:0;
}
</style>