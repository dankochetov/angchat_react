var ErrorViewer = function(props) {
	var errorDivs = props.errors.map(function(e) {
		return <div key={e} style={{color: 'red'}}>{e.msg}</div>;
	});
	return <div>{errorDivs}</div>;
};

ErrorViewer.propTypes = {
	errors: React.PropTypes.array.isRequired
};

module.exports = ErrorViewer;