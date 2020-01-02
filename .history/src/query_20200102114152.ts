export default class Query {
  private fields: string
  private schema: string
  constructor(schema: string) {
    this.schema = schema;
  }

  select(fields:import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
  /**
  * Add the template content to the DOM unless the condition is true.
  *
  * If the expression assigned to `myUnless` evaluates to a truthy value
  * then the templated elements are removed removed from the DOM,
  * the templated elements are (re)inserted into the DOM.
  *
  * <div *ngUnless=
   class=
  >
  *   Congrats! Everything is great!
  * </div>
  *
  * ### Syntax
  * *
  * - `<div *myUnless=
  >...</div>`
  * - `<div template=
  >...</div>`
  * - `<template [myUnless]=
  ><div>...</div></template>`
  *
  */
  @Directive({ selector: '[myUnless]'})
  export class UnlessDirective {
    private hasView = false;
    constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef) { }

    @Input() set myUnless(condition: boolean) {
      if (!condition && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (condition && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }) {
    this.fields = fields.replace(/,/g, " ");
    return this;
  }
  limit(limit) {
    this.limit = limit
    return this;
  }

  where(...condition) {
    if (!condition || condition.length < 2 || condition.length > 3) {
      throw new Error("where need min: 2 and max: 3 args");
      return;
    }
    let where = {};
    if (condition.length == 2) {
      where = {
        [condition[0]]: {
          _eq: condition[1]
        }
      };
    }
    if (condition.length == 3) {
      where = {
        [condition[0]]: {
          ["_" + condition[1]]: condition[2]
        }
      };
    }

    return this;
  }
}
