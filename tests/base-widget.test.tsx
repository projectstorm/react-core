import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { BaseWidget } from "../src/main";

class BaseWidgetTest extends BaseWidget{

	constructor(p){
		super("core-test",p);
	}

	render(){
		return (
			<div {...this.getProps()}>
				<div className={this.bem('__child1')} />
				<div className={this.bem(['__child2', '--modifier1'])} />
				<div className={this.bem({
					'--show-this-modifier': true,
					'--also-this-modifier': true,
					'--hide-this-modifier': false,
				})} />
			</div>
		);
	}
}

test('BaseWidget rendering', () => {
	const component = renderer.create(
		<BaseWidgetTest />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('BaseWidget rendering with extra props', () => {
	const component = renderer.create(
		<BaseWidgetTest extraProps={{style: {color: 'green'}}} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('BaseWidget rendering with different base class', () => {
	const component = renderer.create(
		<BaseWidgetTest baseClass="core-test-override" />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('BaseWidget rendering with appended classNames', () => {
	const component = renderer.create(
		<BaseWidgetTest baseClass="core-test-override" className="extra-class" />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});