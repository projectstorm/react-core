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

export type BEMOptions = string | { [selector: string]: boolean };

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
		if (selector && typeof selector === "object") {
			return _
				.map(selector, (value: boolean, key: string) => {
					if (!!value) {
						return this.buildClass(key);
					}
					return "";
				})
				.join(" ");
		}
		return this.buildClass(selector as string);
	}

	getClassName(selector?: BEMOptions): string {
		let className = this.buildClass();
		if (selector) {
			className += " " + this.bem(selector);
		}
		return this.buildClass() + this.props.className || "";
	}

	getProps(options?: BEMOptions): any {
		return {
			...((this.props.extraProps as any) || {}),
			className: this.getClassName(options)
		};
	}
}
