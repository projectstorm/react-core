import * as React from "react";
import * as _ from "lodash";

export interface BaseWidgetProps {
	/**
	 * Override the base class name
	 */
	baseClass?: string;
	/**
	 * append additional classes
	 */
	className?: string;

	/**
	 * Additional props to add
	 */
	extraProps?: any;
}

export type BEMOptions = string | string[] | { [selector: string]: boolean };

export class BaseWidget<P extends BaseWidgetProps = BaseWidgetProps, S = any> extends React.Component<P, S> {
	className: string;

	constructor(name: string, props: P) {
		super(props);
		this.className = name;
	}

	private buildClass(className?: string) {
		return (this.props.baseClass || this.className) + (className || "");
	}

	bem(selector: BEMOptions): string {
		if(_.isArray(selector)){
			return _.map(selector, (entry) => {
				return this.buildClass(entry as string);
			}).join(' ');
		}
		if (selector && typeof selector === "object") {
			return _
				.chain(selector)
				.pickBy((val) => {
					return !!val;
				})
				.keys()
				.map(this.buildClass.bind(this))
				.value()
				.join(' ');
		}
		return this.buildClass(selector as string);
	}

	getClassName(selector?: BEMOptions): string {
		let className = this.buildClass();
		if (selector) {
			className += " " + this.bem(selector);
		}
		if(this.props.className){
			className += " " + this.props.className;
		}
		return className;
	}

	getProps(options?: BEMOptions): any {
		return {
			...((this.props.extraProps as any) || {}),
			className: this.getClassName(options)
		};
	}
}
