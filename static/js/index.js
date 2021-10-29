function UploadFile(event){
    console.log("inside uploadFile");
    let target = event.target || event.srcElement || event.currentTarget
    let file = target.files[0]
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/uploads/' + file.name, true)
    xhr.setRequestHeader('Content-Type', 'application/octate-stream');
    xhr.onreadystatechange = ()=>{
        event = null
        if (xhr.readyState === 4 ){
            if (xhr.status === 200){
                console.log('success')
            }
            else {
                console.log('error')
            }
        }
    }
    xhr.send(file)
    event.target.value = ""
}

function GetPoem(event){
    console.log("inside getPoem");
    let poem
    fetch('/poem')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            poem =data['poem']
            document.querySelector('.btns').insertAdjacentHTML('afterend',`<div class="preview-image">
                              ${poem}
                      </div>`)
        });

}
document.querySelector('#file').addEventListener('change', UploadFile)