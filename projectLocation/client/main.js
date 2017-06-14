import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Map from './components/map';
import { Lokasyonlar } from '../imports/collections/lokasyonlar';
var map;
  $(document).ready(function(){
    $('ul.tabs').tabs('select_tab', 'tab_id');
  });
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLogged: false,groupId:undefined, groupPW:undefined, username:undefined};
    this.handleClick = this.handleClick.bind(this);
 
  }
  handleClick(event) {
    const groupIdTMP=document.getElementById("refgroupid").value;
    const groupPwTMP=document.getElementById("refgrouppw").value;
    const usernameTMP=document.getElementById("refusername").value;
    event.preventDefault();
      this.setState({
        isLogged:true, groupId:groupIdTMP, groupPW:groupPwTMP, username:usernameTMP,
      });
       DBB = {
            ID: groupIdTMP,
            PW: groupPwTMP,
            UN: usernameTMP
        };
        console.log("ŞUAN OK.");
        console.log(DBB);
      //(groupId,groupPW,user,lt,lg)
      
    }
    renderHome(){
      return (
        <div className="row">
  <nav className="nav-extended blue lighten-1">
        <div className="nav-wrapper">
             <a href="http://locwat-mrkacan.c9users.io:8080/" className="brand-logo left"><i style={{'padding':'0px 5px 0px 15px'}} className="large material-icons left">location_on</i>Loc Wat</a>
              <ul id="nav-mobile" className="right">
                 <li><a><i className="medium material-icons right">settings</i>Settings</a></li>
                 <li><a href="#!" data-activates="dropdown1"><i className="medium material-icons right">more_vert</i></a></li>
             </ul>
           </div>
       
            
          </nav>

  
           <div className="col s12"><Map groupId={this.state.groupId} groupPW={this.state.groupPW} username={this.state.username} /></div>
        </div>
       );
    }
    renderLoggingForm(){
      return (
      <div className="valign-wrapper" style={{'width':'100%','height':'100%','position': 'absolute'}}>
        <div className="valign" style={{'width':'100%'}}>

        <div className="row center" style={{'width':'300px'}}>
          <i style={{'padding':'0px 5px 0px 15px','color':'#3383c3'}} className="large material-icons center">location_on</i>
          <div className="col s12">
            <div className="card blue lighten-1">
                      <div className="card-content white-text" style={{'padding':'20px'}}>
   <form>
     <div className="row">
       <div className="input-field col s12">
       <input id="refgroupid" type="text" ref="refgroupid" className="validate"/>
       <label for="last_name">Group ID</label>
       </div>
       <div className="input-field col s12">
       <input id="refgrouppw" type="password" ref="refgrouppw" className="validate" />
         <label for="last_name">Group PW</label>
       </div>
       <div className="input-field col s12">
       <input id="refusername" type="text" ref="refusername" className="validate" />
         <label for="last_name">Username</label>
       </div>

        <div className="col s12" style={{'margin-top':'30px'}}>
       <a onClick={this.handleClick} className="waves-effect waves-light btn right blue-text text-darken-2 blue lighten-5">Login</a>
        </div>
     </div>
   </form>
 </div>
      </div>
    </div>

 </div>

</div>
</div>
      )
    }
    render()
    {
      if(this.state.isLogged == true)
      {
        return(
          <div className="row">
          {this.renderHome()}
          </div>
        )
      }
      else {
        return(
          <div>
         {this.renderLoggingForm()}
          </div>
        )
      }

      }

}

Meteor.startup(() => {
    ReactDOM.render(
        <App/>, document.querySelector('.app'));
})
