import { injectable } from '@joist/di';
import { observable, observe, OnChange } from '@joist/observable';
import { styled, css } from '@joist/styled';
import { render, html } from 'lit-html';

import { TodoService, Todo, TodoStatus } from './todo.service';

@injectable
@observable
@styled
export class TodoForm extends HTMLElement implements OnChange {
  static deps = [TodoService];

  static styles = [
    css`
      :host {
        display: block;
        background: #fff;
      }

      input {
        box-sizing: border-box;
        display: block;
        padding: 1rem;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        margin: 0;
        width: 100%;
        font-size: 24px;
        line-height: 1.4em;
        border: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      :focus {
        outline: none;
      }

      ::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }

      ::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }

      ::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
    `,
  ];

  @observe value: string = '';

  constructor(private todo: TodoService) {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  onChange() {
    this.render();
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const el = e.target as HTMLFormElement;
    const form = new FormData(el);
    const todo = form.get('todo') as string;

    this.value = todo;

    if (todo.length) {
      this.todo.addTodo(new Todo(todo, TodoStatus.Active));
      this.value = '';
    }
  }

  private template() {
    return html`
      <form @submit=${this.onSubmit}>
        <input
          .value=${this.value}
          name="todo"
          placeholder="What needs to be done?"
          autocomplete="off"
          autofocus
        />
      </form>
    `;
  }

  private render() {
    render(this.template(), this.shadowRoot!);
  }
}

customElements.define('todo-form', TodoForm);
