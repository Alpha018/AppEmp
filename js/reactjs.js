
var Botones = ["7","8","9","+","4","5","6","-",
                "3","2","1","*","0",".","=","/"];

var ComponenteCalculadora = React.createClass({
    getInitialState: function() {
        return {
            data: this.props.data,
            txtSalida:0
        };
    },

    EvaluaColores:function(it){
        var nombreClase='primary';
        var signos = ["+", "-", "*", "/"];
        if(signos.indexOf(it)>-1){nombreClase='success';}
        if(it=='='){nombreClase='warning';}
        return nombreClase;
    },

    BorrarPantalla:function(){
        this.setState({txtSalida:0});
    },

    EvaluarBotones:function(itemPresionado){
    var signos = ["+", "-", "*", "/"];

    if(itemPresionado=='='){
        this.setState({txtSalida:eval(this.state.txtSalida)});
        }else{
            if((this.state.txtSalida==0)){
            if(signos.indexOf(itemPresionado)>-1){this.setState({txtSalida:0});}
            else{this.setState({txtSalida:itemPresionado});}
            }else{
                this.setState({txtSalida:this.state.txtSalida+itemPresionado});
            } 
        }

    },

    render: function() {

        var self = this;
        var mBottom = { marginBottom: '10px'};
        var ClaseBotones='btn-lg btn-block  btn btn-';
        var ListaBotones = this.state.data.map(function(item) {
            return <div className="col-md-3" style={mBottom} >
            <input type="button"  onClick={self.EvaluarBotones.bind(self,item)} className={ClaseBotones+(self.EvaluaColores(item))} value={item}/>
            </div>;
        });

        return React.DOM.div({
            className:'form-group', 
            children:[React.DOM.input({ 
            type:"text",
            className:"form-control",
            name:"txtResultado",
            ref:"txtResultado",
            value:this.state.txtSalida,
            style:{height:'67px',fontSize:'44px',textAlign:'right',marginBottom:"20px",boxShadow:"inset 3px 3px rgba(0, 0, 0, 0.2)"},
            placeholder:"Disabled"
            }),

            (<div className="row">{ListaBotones}</div>)
            ,(<input onClick={this.BorrarPantalla} type="button" className="btn btn-danger btn-lg btn-block" value='Borrar'/>)
            ] 
        });
    }
});
React.renderComponent(<ComponenteCalculadora data={Botones} />, document.getElementById('idCalculadora'));