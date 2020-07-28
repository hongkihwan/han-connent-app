<template>
  <div style="width:100%;height:100%;" >
    <div style="display:flex;margin-top:5px;">
        <div style="width:70%;text-align:left;margin-top:10px;margin-left:10px;">
            <div class="form-control-group" style="display:flex;height:30px;">
                <label style="width:100px;text-align:right;margin-top:7px;margin-right:10px;">고객명</label>
                <div style="display:flex;width:100%;margin:0;padding:0;">
                    <input type="text" class="form-control"  style="height:100%;">
                </div>
            </div>
            <div class="form-control-group" style="margin-top:3px;margin-bottom:3px;display:flex;height:30px;">
                <label style="width:100px;text-align:right;margin-top:7px;margin-right:10px;">전화번호</label>
                <div style="display:flex;width:100%;margin:0;padding:0;">
                    <input type="text" class="form-control" style="width:80%;height:100%;" @keypress="isNumber($event)">
                    <div style="margin-left:6px;margin-right:2px;margin-top:4px;cursor:pointer;">
                        <i class="fas fa-phone-volume fa-lg" style="height:100%;"/>
                    </div>
                </div>
            </div>
            <div class="form-control-group" style="display:flex;height:30px;">
                <label style="width:100px;text-align:right;margin-top:7px;margin-right:10px;">차대번호</label>
                <div style="display:flex;width:100%;margin:0;padding:0;">
                    <input type="text" class="form-control" max="10" style="height:100%;">
                </div>
            </div>
        </div>

        <div  style="margin-left: 10px;margin-top:10px;width:100px;margin-right:5px;">
            <button  @click="customerSearch" class="btn btn-primary" type="button" style="height:100%;">고객검색</button>
        </div>
    </div>    
    <div style="margin-top:5px;font-size:12pt;display:flex;float:left;margin-left:27px;">
      <label >Copy Zone :&nbsp;</label>
      <label style="cursor:pointer;" ></label>
      <label style="cursor:pointer;"></label>
      <label style="cursor:pointer;" ></label>
      <div><i class="far fa-copy" style="margin-left:3px;margin-right:6px;margin-top:2px;cursor:pointer;" /></div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        isNumber(event){
            let keycode = event.keycode;
            if(keycode > 48 && keycode < 57) {
                return true;
            }else {
                return false;
            }
        },
        customerSearch() {
            
        }
    }
}
</script>

<style>

</style>