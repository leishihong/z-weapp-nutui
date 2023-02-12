export interface IResponseData<T = any> {
	status: number;
	message: string;
	success: boolean;
	data: T;
}

export interface IHttpResponse<T = IResponseData> {
	statusCode: number;
	header: object;
	data: T;
	cookies: string[];
	profile: object;
}
export type IMethodsType =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'OPTIONS'
	| 'HEAD'
	| 'TRACE'
	| 'CONNECT';

export interface IContentType {
	json: 'application/json';
	form: 'application/x-www-form-urlencoded';
	formData: 'multipart/form-data';
}
