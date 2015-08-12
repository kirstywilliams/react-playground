# Playground for learning / experimenting with React.js

## [Getting Started](intro/)

* **Notes:**
	* State + Properties -> HTML
	* State can be changed; Properties are immutable
	* When State changes, the component holding that state triggers a re-render. 
	* Computes difference between old virtual DOM and new virtual DOM and only updates the changed components in the browser DOM - faster, much FASTER! 
	* Component reusability
* **Compile on change:**

```
npm install -g react-tools
jsx --watch src/ build/
```
## [Working With Data](1-github-cards/)

* **Notes:**
	* Lifecycle hooks
	* this.refs
	* findDOMNode