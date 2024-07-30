import Message from "../components/Message/Message"
import * as React from 'react'
import ReactDOM from 'react-dom/client';

const message = {
    dom: null,
    render: null,
    constructor(){
        this.dom = document.createElement('div')
        this.render = ReactDOM.createRoot(this.dom)
    },

    success({content, duration}) {
        this.constructor()
        const JSXdom = (<Message content={content} duration={duration} type='success'></Message>)
        this.render.render(JSXdom)
        document.body.appendChild(this.dom)
    },
    error({content, duration}) {
        this.constructor()
        const JSXdom = (<Message content={content} duration={duration} type='error'></Message>);
        this.render.render(JSXdom)
        document.body.appendChild(this.dom)

    },
    warning({content, duration}) {
        this.constructor()
        const JSXdom = (<Message content={content} duration={duration} type='warning'></Message>);
        this.render.render(JSXdom)
        document.body.appendChild(this.dom)

    },
    info({content, duration}) {
        this.constructor()
        const JSXdom = (<Message content={content} duration={duration} type='warning'></Message>);
        this.render.render(JSXdom)
        document.body.appendChild(this.dom)

    }
};

export default message