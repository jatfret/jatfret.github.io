---
layout: "post"
title: "React/JSX 规范"
date: 2017-06-13 14:32:39 +0800
category: technology
tags: React 翻译
---

# React/JSX 组件编写规范

*一个写 React 和 JSX 几乎最合理的途径。

## 内容列表
  
  1.[基本规则](#basic-rules)
  1.[Class VS `React.createClass` VS stateless](#class-vs-reactcreateclass-vs-stateless)
  1.[Mixins](#mixins)
  1.[Naming](#naming)
  1.[Declaration](#declaration)
  1.[Alignment](#Alignment)
  1.[Quotes](#quotes)
  1.[Spacing](#spacing)
  1.[Props](#props) 
  1.[Refs](#refs)
  1.[Parenteses](#parenteses)
  1.[Tags](#tags)
  1.[Methods](#methods)
  1.[Ordering](#ordering)
  1.[`isMounted`](#ismounted)

## 基本规则

  - 一个文件只包含一个 React 组件
    - 然而， 多个 [无状态组件，或者纯函数，组件](https://facebook.github.io/react/docs/reuseable-components.html#stateless-function)是允许出现在一个文件中的。eslint: [`react/no-multi-comp`](http://github.com/yannickcr/eslint-pugin-react/blob/master/docs/rule/no-multi-comp.md#ignorestateless)。
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















