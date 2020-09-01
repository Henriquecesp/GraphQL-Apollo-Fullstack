export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum StatusEnum {
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export enum ActionEnum {
  Add = 'ADD',
  Sub = 'SUB'
}

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  count: Scalars['Int'];
};


export type QueryHelloArgs = {
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCount: CountResult;
};


export type MutationAddCountArgs = {
  step?: Maybe<Scalars['Int']>;
  action?: Maybe<ActionEnum>;
};

export type CountResult = {
  __typename?: 'CountResult';
  status: StatusEnum;
  count: Scalars['Int'];
};

export type CountSub = {
  __typename?: 'CountSub';
  action: ActionEnum;
  count: Scalars['Int'];
};

export type Counter = {
  __typename?: 'Counter';
  count: Scalars['Int'];
  countStr?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Bla bla */
  counterOnChange: CountSub;
};
