class ImmutableObject<T extends object> {
  constructor(readonly object: T) {}

  has(key: keyof T) {
    return Object.prototype.hasOwnProperty.call(this.object, key);
  }

  get(key: keyof T) {
    if (!this.has(key)) {
      return null;
    }

    return this.object[key];
  }

  set(key: keyof T, data: T[keyof T]) {
    if (this.has(key)) {
      return this;
    }

    const newObject = { ...this.object, [key]: data };

    return new ImmutableObject(newObject);
  }

  delete(key: keyof T) {
    if (!this.has(key)) {
      return this;
    }

    const newObject = { ...this.object };

    delete newObject[key];

    return new ImmutableObject(newObject);
  }

  edit(key: keyof T, props: Partial<T[keyof T]>) {
    const data = this.get(key);

    if (!data) {
      return this;
    }

    const newObject = { ...this.object, [key]: { ...data, ...props } };

    return new ImmutableObject(newObject);
  }
}

export default ImmutableObject;
