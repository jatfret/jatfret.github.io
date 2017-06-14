---
layout: "post"
title: "React/JSX 规范"
date: 2017-06-13 14:32:39 +0800
category: technology
tags: React 翻译
---

# React/JSX 组件编写规范

*一个写 React 和 JSX 几乎最合理的途径。*

## 内容列表

  1. [基本规则](#basic-rules)
  1. [Class VS `React.createClass` VS stateless](#class-vs-reactcreateclass-vs-stateless)
  1. [Mixins](#mixins)
  1. [Naming](#naming)
  1. [Declaration](#declaration)
  1. [Alignment](#Alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Refs](#refs)
  1. [Parenteses](#parenteses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Ordering](#ordering)
  1. [`isMounted`](#ismounted)

## 基本规则

  - 一个文件只包含一个 React 组件
    - 然而， 多个 [无状态组件，或者纯函数，组件](https://facebook.github.io/react/docs/reuseable-components.html#stateless-function)是允许出现在一个文件中的。eslint: [`react/no-multi-comp`](http://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rule/no-multi-comp.md#ignorestateless)。
    - 保持使用 JSX 语法。
    - 不要使用 `React.createElement`, 除非你在一个不是JSX文件中初始化app。

## Class vs `React.createClass` vs stateless

  - 如果你需要在组件内部维护 state 或者 refs， 使用 `class extends React.Component` 代替 `React.createClass`。eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)[`react-prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

    ```jsx
    //bad
    const Listing = React.createCLass({
      //...
      render() {
        return <div>{this.state.hello}</div>;
      }  

    });

    //good
    class Listing extends React.Component {
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    }
    ```

    如果你的组件不需要维护内部 state 或者 refs， 使用正常函数（不包括箭头函数）来代替 classes;

    ```jsx
    // bad
    class Listing extends React.Component {
      render()  {
        return <div>{this.props.hello}</div>;
      }
    }

    //bad (relying on function name inference is discouraged)
    const Listing = ({hello}) => (
      <div>{hello}</div>
    );

    // good
    function Listing({hello}) {
      return <div>{hello}</div>;
    }
    ```

## Mixins

  - [不要使用 mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

  > 为什么？Mixins 引入隐式依赖，可能会引起 name clashes, snowballing complexity。大部分使用 mixins 的需求可以通过组件、高阶组件或者 utility modules 来更好的实现。

## Naming

  - **扩展名**: React 组件使用 `jsx` 扩展名。
  - **文件名**: 使用 PascalCase 方式给文件命名。E.g., `ReservationCard.jsx`。
  - **引用命名空间**: 使用 PacalCase 方式给 React 组件 和 camelCase 给它的实例命名。eslint: [`react/jsx-pascal-case`](http://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

    ```jsx
    // bad
    import reservationCard from './ReservationCard';

    // good
    import ReservationCard from './ReservationCard';

    //bad
    const reservationItem = <ReservationCard>;

    //good
    const ReservationItem = <ReservationCard>;
    ```
  - **组件命名**: 使用文件名作为组件名。例如，`ReservationCard.jsx` 应该有一个引用名称为 `ReservationCard`。然而，对于目录下的 root 组件，使用 `index.jsx` 作为文件名，使用目录名作为组件名:

    ```jsx
    // bad
    import Footer from './Footer/Footer';

    //bad
    import Footer from './Footer/index';

    // goood
    import Footer from './Footer';
    ```

  - **高阶组件命名**: 使用高阶组件名称和传入组件的名称复合作为被生成组件的 `displayName`。例如，高阶组件 `withFoo`，当传入组件 `bar` 后，生成组件的 `displayName` 应该为 `withFoo(Bar)`。

    > 为什么？组件的 `displayName` 可能会出现在开发者工具或者错误信息里，有一个能清晰的表达出这种关系的值会帮助使用者明白发生了什么。

    ```jsx
    //bad
    export default function withFoo(WrappedComponent) {
      return function WithFoo(props) {
        return <WrappedComponent {...props} foo />
      }
    }

    // good
    export default function withFoo(WrappedComponent) {
      function WithFoo(props) {
        return <WrappedComponent {...props} foo />;
      }

      const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponnet.name
        || 'Componnent';

      WithFoo.displayName = `WithFoo(${wrappedComponentName})`;
      return WithFoo;
    }
    ```
  - **props Naming**: 对于各种不同的目的，避免使用 DOM 属性名称去命名。
    > 为什么？ 开发者期望用类似 `style` 和 `className` 的 props 去阐述事情，使用这些 API 的子集会使你的代码可读性变差，不容易维护，同时也可能引入 bugs。

    ```jsx
    //bad
    <MyComponent style="fancy" />

    //good
    <MyComponent variant="fancy" />
    ```

## 声明

  - 不要使用 `displayName` 来命名组件，可通过引用来命名组件。

    ```jsx
    // bad
    export default React.createClass({
      displayName: 'ReservationCard',
      // stuff goes here
    });

    // good
    export default class ReservationCard extends React.Component {
    }
    ```

## 对齐方式

  - JSX 语法按照这些规则来对齐。eslint: [`react/jsx-closing-bracket-location`](https//github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```jsx
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    //good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="bar"
    />

    // 如果 props 可以一行放得下，就保持单行即可
    <Foo bar="bar" />

    // children 正常缩紧
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Quux />
    </Foo>
    ```

## 引号

  - 对于 JSX 属性总是使用双引号(`""`)，但是对于所有其他的 JS 要使用单引号(`'`)。eslint: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)

    > 为什么？ 常规的 HTML 文档总是使用双引号而不是单引号，所以 JSX 的属性也按照对应的规范。

    ```jsx
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={ left: "20px" } />

    // good
    <Foo style={ left: '20px'} />
    ```

## 空格

  - 总是保留单个空格在自闭合标签的结尾处。eslint: [`no-multi-spaces`](http://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

    ```jsx
    // bad
    <Foo />

    // very bad
    <Foo             />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```
  - Do not pad JSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

    ```jsx
    // bad
    <Foo bar={ baz } />

    // good
    <Foo bar={baz} />
    ```

## Props

  - prop 的名称总是使用 camelCase

    ```jsx
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```

    - 当 prop 的值明确的为 `true`的时候，可以将值省略。eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

    ```jsx
    // bad
    <Foo
      hidden={true}
    />

    // good
    <Foo
      hidden
    />
    ```

  - 对于 `<img>`总是要引入一个 `alt` 属性。如果图片是 `presentational`， `alt` 可以被设置为空字符串或者 `<img>` 必须包括 `role=presention`。eslint: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

    ```jsx
    // bad
    <img src="hello.jpg" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />

    // good
    <img src="hello.jpg" alt="" />

    // good
    <img src="hello.jpg" role="presentation" />
    ```
  - 不要在 `<img>` `alt` props里使用像"image"或者"picture"这些词。eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)  

  > 为什么？screenreader 已经认为 `img` 元素为图片，因此没有必要这一信息在 alt 里面。


    ```jsx
    // bad
    <img src="hello.jpg" alt="Picture of me waving hello" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />
    ```
  - 只使用有效的，no-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

    ```jsx
    // bad - not an ARIA role
    <div role="datepicker" />

    // bad - abstract ARIA role
    <div role="range" />

    // good
    <div role="button" />
    ```

  - 不要在元素上使用 `accessKey`。eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

  > 为什么？ 人们使用屏幕阅读器和键盘时，键盘快捷键和键盘命令会相矛盾。

    ```jsx
    // bad
    <div accessKey="h" />

    // good
    <div />
    ```

  - 避免使用数组的索引 index 作为 `key` prop，更倾向与使用唯一的 ID。 ([why?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

    ```jsx
    // bad
    {todos.map((todo, index) =>
      <Todo
        {...todo}
        key={index}
      />
    )}

    // good
    {todos.map(todo => (
      <Todo
        {...todo}
        key={todo.id}
      />
    ))}
    ```
  - 对于 non-required props 总是定义明确的 defaultProps。

  > 为什么？ defaultProps 是文档的一个表格，提供 defaultProps 意味着你的代码阅读者不需要做过多的假设去猜测，另外，它也能说明你的代码能明确的通过类型检查。

    ```jsx
    // bad
    function SFC({ foo, bar, children }) {
      return <div>{foo}{bar}{children}</div>;
    }
    SFC.propTypes = {
      foo: PropTypes.number.isRequired,
      bar: PropTypes.string,
      children: PropTypes.node,
    };

    // good
    function SFC({ foo, bar, children }) {
      return <div>{foo}{bar}{children}</div>;
    }
    SFC.propTypes = {
      foo: PropTypes.number.isRequired,
      bar: PropTypes.string,
      children: PropTypes.node,
    };
    SFC.defaultProps = {
      bar: '',
      children: null,
    };
    ```

## Refs

  - 总是使用 ref 回调函数来赋值。eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

    ```jsx
    // bad
    <Foo
      ref="myRef"
    />

    // good
    <Foo
      ref={(ref) => { this.myRef = ref; }}
    />
    ```

## Parentheses
  - 当 JSX 标签超过一行的时候，在 Parentheses 里包裹标签。eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

    ```jsx
    // bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

## 标签

  - 当没有子元素的时候总是使用自闭合标签。eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

    ```jsx
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

  - 当你的组件有多个行属性时，另起一行来闭合标签。eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```jsx
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```


## 方法

  - 使用箭头函数来 close over 本地变量。
    ```jsx
    function ItemList(props) {
      return (
        <ul>
          {props.items.map((item, index) => (
            <Item
              key={item.key}
              onClick={() => doSomethingWith(item.name, index)}
            />
          ))}
        </ul>
      );
    }
   ```

   - 在 constructor 里绑定 render 函数里要用到的事件处理函数。 eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

   > 为什么？  A bind call in the render path creates a brand new function on every single render.
   ```jsx
   function ItemList(props) {
     return (
       <ul>
         {props.items.map((item, index) => (
           <Item
             key={item.key}
             onClick={() => doSomethingWith(item.name, index)}
           />
         ))}
       </ul>
     );
   }
   ```

   - 对于 React 组件的的内部方法不要使用下划线前缀。
  > 为什么？ 下划线前缀有时可能会被转换（Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. ）See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

    ```jsx
    // bad
    React.createClass({
      _onClickSubmit() {
        // do stuff
      },

      // other stuff
    });

    // good
    class extends React.Component {
      onClickSubmit() {
        // do stuff
      }

      // other stuff
    }
    ```

  - 保证你的 `render` 方法会有返回值。eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

    ```jsx
    // bad
    render() {
      (<div />);
    }

    // good
    render() {
      return (<div />);
    }
    ```

## Ordering

  - `class extends React.Component`里面方法的书写顺序:

  1. optional `static` methods
  1. `constructor`
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
  1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  1. `render`

  - 如何定义 `propTypes`, `defaultProps`, `contextTypes`, etc...

    ```jsx
    import React from 'react';
    import PropTypes from 'prop-types';

    const propTypes = {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
    };

    const defaultProps = {
      text: 'Hello World',
    };

    class Link extends React.Component {
      static methodsAreOk() {
        return true;
      }

      render() {
        return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
      }
    }

    Link.propTypes = propTypes;
    Link.defaultProps = defaultProps;

    export default Link;
    ```

  - `React.creatClass`内部方法排序：eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

  1. `displayName`
  1. `propTypes`
  1. `contextTypes`
  1. `childContextTypes`
  1. `mixins`
  1. `statics`
  1. `defaultProps`
  1. `getDefaultProps`
  1. `getInitialState`
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
  1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  1. `render`


## `isMounted`

  - 不要使用 `isMounted`。eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

  > Why? [`isMounted` is an anti-pattern][anti-pattern], is not available when using ES6 classes, and is on its way to being officially deprecated.

  [anti-pattern]: https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
