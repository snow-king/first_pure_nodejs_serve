const element = (tag, classes = [], content) => {
    const node = document.createElement(tag)

    if (classes.length) {
        node.classList.add(...classes)
    }

    if (content) {
        node.textContent = content
    }

    return node
}

export function upload(selector , options = {}) {

    // const onUpload = options.onUpload ?? noop
    const input = document.querySelector(selector)
    const preview = element('div', ['preview'])
    const open = element('button', ['btn'], 'Открыть')
    // const upload = element('button', ['btn', 'primary'], 'Загрузить')

    // check the number of files
    if (options.multi){
        input.setAttribute('multiple', true)
    }
    const changeHandler  = event => {
        console.log(event.target.files.length)
        if(event.target.files.length){
            const  files = Array.from(event.target.files)
            files.forEach(file => {
                const reader = new FileReader()
                reader.onload = ev =>{
                    console.log(ev.target.result)
                    preview.insertAdjacentHTML('afterbegin',`
                            <div class="preview-image">
                                <img src="${ev.target.result}" alt="${file.name}"/>
                            </div>
                    `)
                }
                reader.readAsDataURL(file)
            })
        }
    }

    if (options.accept && Array.isArray(options.accept)){
        input.setAttribute('accept', options.accept.join(','))
    }
    input.insertAdjacentElement('afterend', preview)
    // input.insertAdjacentElement('afterend', upload)
    input.insertAdjacentElement('afterend', open)
    const triggerInput = () => input.click()

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
}