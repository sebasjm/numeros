class NumberState extends React.Component {
    state = {
        value: ''
    }
    onChange = e => {
        const value = e.target.value ? parseInt(e.target.value) : ''
        if (Number.isNaN(value)) return;
        this.setState({value}) 
    }
    render() {
        const Child = this.props.children
        return <Child {...this} />
    }
}

const isClose = (n, v) => n === v ? "green" : ( Math.abs(n - v) < 3 ? "yellow" : "red" )

const gradient = (dist,size) => {
    const red = dist > size ? 'FF' : Math.round(255/size * dist).toString(16)
    const green = "ff"
    const blue = dist < size ? '00' : (dist > size*2 ? "FF" : Math.round(255/size * dist/2).toString(16))
    return '#' + red + green + blue
}

const isCloseColor = (n, v) => n>v ? gradient(n-v, n/4) : gradient(v-n, n/4)

const Row = ({initial}) => <div className="container">
    {Array(10)
        .fill()
        .map( (_,i) => i+1 )
        .map( i => initial*i )
        .map( n => 
            <NumberState key={n} >{ ({state,onChange}) =>
                <div className="box" style={{backgroundColor: isCloseColor(n, state.value) }}>
                    <input tabindex={initial*100+n} value={state.value} onChange={onChange} type="number" className={isClose(n, state.value)} />
                </div>
            }</NumberState>
        )
    }
    <style jsx>{`
        .box input {
            width: 60px;
            height: 60px;
            margin: 5px;
            font-size: 40px;
            text-align: center;
        }
        input:focus {
            background-color: cyan;
        }
        .green {
            background-color: green;
        }
        .yellow {
            background-color: yellow;
        }
        .red {
            background-color: red;
        }
        .container {
            display: flex;
        }
    `}</style>
</div>

const Grid = () => <div>
        {Array(10)
            .fill()
            .map( (_,i) => i+1 )
            .map( i => <Row key={i} initial={i} />)}
</div>

export default Grid