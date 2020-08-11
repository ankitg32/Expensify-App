"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        React.createElement(
            "h2",
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: "Unknown App"
};

// class Header extends React.Component {
//     render() {
//         return ( 
//             <div>
//                 <h1>{this.props.title}</h1> 
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//             );
//     }
// }

var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.handlePick, disabled: props.hasOptions },
            "What should I do?"
        )
    );
};

// class Action extends React.Component {

//     render(){
//         return (
//             <div>
//                 <button onClick={this.props.handlePick} disabled={this.props.hasOptions}>What should I do?</button>
//             </div>
//         );
//     }
// }

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.handleDeleteOptions },
            "Remove All"
        ),
        props.options.length === 0 ? React.createElement(
            "p",
            null,
            "Please add an option to get started!"
        ) : React.createElement(
            "p",
            null,
            "Here are your ",
            props.options.length,
            " options:"
        ),
        React.createElement(
            "ul",
            null,
            props.options.map(function (option) {
                return React.createElement(Option, {
                    key: option,
                    val: option,
                    handleDeleteOption: props.handleDeleteOption
                });
            })
        )
    );
};
//<button onClick={() => {props.handleDeleteOption()}}>X</button>

// class Options extends React.Component {
//     constructor(props){
//         super(props);
//     }

//     render(){
//         return (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 <p>Here are your {this.props.options.length} options:</p>
//                 <ul>
//                     {this.props.options.map( option => 
//                             <Option key={option} val={option}/>
//                         )}
//                 </ul>
//             </div>
//         );
//     }
// }

var AddOption = function (_React$Component) {
    _inherits(AddOption, _React$Component);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this.state = {
            error: undefined
        };
        _this.handleAddition = _this.handleAddition.bind(_this);
        return _this;
    }

    _createClass(AddOption, [{
        key: "handleAddition",
        value: function handleAddition(e) {
            e.preventDefault();
            var newOption = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(newOption);
            newOption && error;
            this.setState(function () {
                return { error: error };
            });
            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.handleAddition },
                    React.createElement("input", { type: "text", name: "option" }),
                    React.createElement(
                        "button",
                        null,
                        "Add Options"
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

var Option = function (_React$Component2) {
    _inherits(Option, _React$Component2);

    function Option() {
        _classCallCheck(this, Option);

        return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
    }

    _createClass(Option, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            //console.log(this.props.val);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "li",
                    null,
                    this.props.val,
                    React.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                return _this3.props.handleDeleteOption(_this3.props.val);
                            } },
                        "X"
                    )
                )
            );
        }
    }]);

    return Option;
}(React.Component);

var IndecisionApp = function (_React$Component3) {
    _inherits(IndecisionApp, _React$Component3);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this4 = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this4.state = {
            options: []
        };
        _this4.handleDeleteOptions = _this4.handleDeleteOptions.bind(_this4);
        _this4.handlePick = _this4.handlePick.bind(_this4);
        _this4.handleAddOption = _this4.handleAddOption.bind(_this4);
        _this4.handleDeleteOption = _this4.handleDeleteOption.bind(_this4);
        return _this4;
    }

    _createClass(IndecisionApp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            //console.log('componentDidMount!');
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                //Do Nothing
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            //console.log('componentDidUpdate!', prevProps, prevState);
            //we can use this method to save data to localStorage
            if (prevState.options.length !== this.state.options.length) {
                localStorage.setItem('options', JSON.stringify(this.state.options));
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            console.log('componentWillUnMount!');
        }
    }, {
        key: "handleAddOption",
        value: function handleAddOption(newOption) {
            if (!newOption) {
                return "Enter a valid value";
            } else if (this.state.options.indexOf(newOption) > -1) {
                return "This item already exists";
            }
            if (newOption) {
                this.setState(function (prevState) {
                    return { options: prevState.options.concat(newOption) };
                });
            }
        }
    }, {
        key: "handlePick",
        value: function handlePick() {
            var rand = Math.floor(Math.random() * this.state.options.length);
            window.alert("Jarvis chose " + this.state.options[rand] + " for you.");
        }
    }, {
        key: "handleDeleteOptions",
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "handleDeleteOption",
        value: function handleDeleteOption(optionToRemove) {
            //console.log('deleting one option', option);
            var search_index = this.state.options.indexOf(optionToRemove);
            var current_options = this.state.options;
            if (search_index > -1) {
                current_options.splice(search_index, 1);
                this.setState(function () {
                    return { options: current_options };
                });
            }
        }
        /* Used by Andrew
        handleDeleteOption(optionToRemove){
            this.setState( (prevState)=> ({
                options : prevState.options.filter((option) => optionToRemove !== option )
            }) );
        }
        */

    }, {
        key: "render",
        value: function render() {
            var title = 'Indecision App';
            var subtitle = 'Put your life in the hands of a computer';

            return React.createElement(
                "div",
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(Action, { handlePick: this.handlePick, hasOptions: this.state.options.length == 0 }),
                React.createElement(Options, { options: this.state.options, handleDeleteOptions: this.handleDeleteOptions, handleDeleteOption: this.handleDeleteOption }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
