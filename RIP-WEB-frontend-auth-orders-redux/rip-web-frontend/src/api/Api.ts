/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HandlerAddToPredictionRequest {
  /** @example 1 */
  load_id: number;
}

export interface HandlerAddToPredictionResponse {
  /** @example "Аномалия добавлена в заявку" */
  message?: string;
  /** @example 1 */
  prediction_id?: number;
}

export interface HandlerLoadsListResponse {
  loads?: HandlerLoadShortResponse[];
}

export interface HandlerLoadCalculatedConsumption {
  /** @example "45,67,89" */
  anomalous_rings?: string;
  /** @example 1 */
  load_id?: number;
  /** @example "Аномалия роста" */
  load_name?: string;
  /** @example 2023 */
  calculated_consumption?: number;
}

export interface HandlerLoadDetailResponse {
  /** @example "Описание аномалии" */
  description?: string;
  /** @example 1 */
  id?: number;
  /** @example "http://localhost:9000/images/load_1.jpg" */
  image_url?: string;
  /** @example "Аномалия роста" */
  name?: string;
  /** @example 2023 */
  consumption?: number;
}

export interface HandlerLoadShortResponse {
  /** @example 1 */
  id?: number;
  /** @example "http://localhost:9000/images/load_1.jpg" */
  image_url?: string;
  /** @example "Аномалия роста" */
  name?: string;
  /** @example 2023 */
  consumption?: number;
}

export interface HandlerCompletePredictionRequest {
  /** @example "complete" */
  action: string;
}

export interface HandlerCompletePredictionResponse {
  loads?: HandlerLoadCalculatedConsumption[];
  /** @example 2023 */
  final_consumption?: number;
  /** @example 1 */
  id?: number;
  /** @example "завершён" */
  status?: string;
  /** @example 3 */
  total_loads?: number;
}

export interface HandlerCreateLoadRequest {
  /** @example "Описание аномалии" */
  description: string;
  /** @example "Аномалия роста" */
  name: string;
  /** @example 2023 */
  consumption: number;
}

export interface HandlerErrorResponse {
  /** @example "Описание ошибки" */
  error?: string;
}

export interface HandlerLoginRequest {
  /** @example "research_user" */
  login: string;
  /** @example "password123" */
  password: string;
}

export interface HandlerLoginResponse {
  /** @example "Успешная аутентификация" */
  message?: string;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  token?: string;
  user?: HandlerUserResponse;
}

export interface HandlerMessageResponse {
  /** @example "Сообщение об успехе" */
  message?: string;
}

export interface HandlerRegisterRequest {
  /**
   * @minLength 3
   * @maxLength 25
   * @example "new_user"
   */
  login: string;
  /**
   * @minLength 6
   * @example "securepassword"
   */
  password: string;
}

export interface HandlerPredictionCartResponse {
  /** @example 0 */
  item_count?: number;
  /** @example 0 */
  prediction_id?: number;
  /** @example -1 */
  user_id?: number;
}

export interface HandlerPredictionDetailResponse {
  prediction?: HandlerPredictionResponse;
  predictionItems?: HandlerPredictionItemResponse[];
}

export interface HandlerPredictionItemResponse {
  /** @example "45,67,89" */
  anomalous_rings?: string;
  /** @example 1 */
  load_id?: number;
  /** @example "http://localhost:9000/images/load_1.jpg" */
  load_image?: string;
  /** @example "Аномалия роста" */
  load_name?: string;
  /** @example 2023 */
  calculated_consumption?: number;
}

export interface HandlerPredictionResponse {
  /** @example 1 */
  creator_id?: number;
  /** @example "Описание заявки" */
  description?: string;
  /** @example 2023 */
  final_consumption?: number;
  /** @example 1 */
  id?: number;
  /**
   * Добавляем для модератора
   * @example "черновик"
   */
  status?: string;
  /** @example 100 */
  total_rings?: number;
}

export interface HandlerPredictionShortResponse {
  /** @example 3 */
  amount_of_loads?: number;
  /** @example "research_user" */
  creator?: string;
  /**
   * Добавляем final_consumption
   * @example 2023
   */
  final_consumption?: number;
  /** @example 1 */
  id?: number;
  /** @example "moderator_user" */
  moderator?: string;
  /** @example "черновик" */
  status?: string;
}

export interface HandlerPredictionsListResponse {
  predictions?: HandlerPredictionShortResponse[];
}

export interface HandlerUpdateLoadRequest {
  /** @example "Обновленное описание" */
  description?: string;
  /** @example "Обновленное название" */
  name?: string;
  /** @example 2024 */
  consumption?: number;
}

export interface HandlerUpdateLoadResponse {
  load?: HandlerLoadDetailResponse;
  /** @example "Информация об аномалии обновлена" */
  message?: string;
}

export interface HandlerUpdatePredictionItemRequest {
  /** @example "45,67,89" */
  anomalous_rings?: string;
}

export interface HandlerUpdatePredictionItemResponse {
  /** @example "45,67,89" */
  anomalous_rings?: string;
  /** @example 0 */
  calculated_consumption?: number;
  /** @example "Элемент заявки обновлен" */
  message?: string;
}

export interface HandlerUpdatePredictionRequest {
  /** @example "Обновленное описание" */
  description?: string;
  /**
   * Добавляем final_consumption
   * @example 2024
   */
  final_consumption?: number;
  /** @example 120 */
  total_rings?: number;
}

export interface HandlerUpdateUserRequest {
  /** @example "new_login" */
  login?: string;
}

export interface HandlerUploadImageResponse {
  /** @example "load_image" */
  filename?: string;
  /** @example "http://localhost:9000/images/load_1.jpg" */
  image_url?: string;
  /** @example "Изображение загружено" */
  message?: string;
}

export interface HandlerUserResponse {
  /** @example 1 */
  id?: number;
  /** @example false */
  is_moderator?: boolean;
  /** @example "research_user" */
  login?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title RIP-WEB API
 * @version 1.0
 * @license MIT (https://opensource.org/licenses/MIT)
 * @contact API Support <support@rip-web.ru> (http://localhost:8080)
 *
 * API для системы исследования аномалий деревьев
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Возвращает список аномалий с возможностью фильтрации по названию и году
     *
     * @tags loads
     * @name LoadsList
     * @summary Получение списка аномалий
     * @request GET:/api/loads
     */
    loadsList: (
      query?: {
        /** Фильтр по названию */
        name?: string;
        /** Фильтр по году */
        consumption?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerLoadsListResponse, any>({
        path: `/api/loads`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Создает новую запись об аномалии (требуется аутентификация)
     *
     * @tags loads
     * @name LoadsCreate
     * @summary Создание новой аномалии
     * @request POST:/api/loads
     * @secure
     */
    loadsCreate: (
      load: HandlerCreateLoadRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerLoadDetailResponse, HandlerErrorResponse>({
        path: `/api/loads`,
        method: "POST",
        body: load,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает полную информацию об аномалии по ID
     *
     * @tags loads
     * @name LoadsDetail
     * @summary Получение информации об аномалии
     * @request GET:/api/loads/{id}
     */
    loadsDetail: (id: number, params: RequestParams = {}) =>
      this.request<HandlerLoadDetailResponse, HandlerErrorResponse>({
        path: `/api/loads/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные аномалии (требуется аутентификация)
     *
     * @tags loads
     * @name LoadsUpdate
     * @summary Обновление информации об аномалии
     * @request PUT:/api/loads/{id}
     * @secure
     */
    loadsUpdate: (
      id: number,
      load: HandlerUpdateLoadRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerUpdateLoadResponse, HandlerErrorResponse>({
        path: `/api/loads/${id}`,
        method: "PUT",
        body: load,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет аномалию и связанное с ней изображение (требуется аутентификация)
     *
     * @tags loads
     * @name LoadsDelete
     * @summary Удаление аномалии
     * @request DELETE:/api/loads/{id}
     * @secure
     */
    loadsDelete: (id: number, params: RequestParams = {}) =>
      this.request<HandlerMessageResponse, HandlerErrorResponse>({
        path: `/api/loads/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Загружает изображение для аномалии в Minio (требуется аутентификация)
     *
     * @tags loads
     * @name LoadsImageCreate
     * @summary Загрузка изображения для аномалии
     * @request POST:/api/loads/{id}/image
     * @secure
     */
    loadsImageCreate: (
      id: number,
      data: {
        /** Изображение */
        image: File;
        /** Название файла */
        filename?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerUploadImageResponse, HandlerErrorResponse>({
        path: `/api/loads/${id}/image`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список заявок с фильтрацией по статусу и дате
     *
     * @tags predictions
     * @name PredictionsList
     * @summary Получение списка заявок
     * @request GET:/api/predictions
     * @secure
     */
    predictionsList: (
      query?: {
        /** Фильтр по статусу */
        status?: string;
        /** Фильтр по дате от (формат: YYYY-MM-DD) */
        date_from?: string;
        /** Фильтр по дате до (формат: YYYY-MM-DD) */
        date_to?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerPredictionsListResponse, HandlerErrorResponse>({
        path: `/api/predictions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает данные корзины для авторизованных пользователей или статические данные для гостей
     *
     * @tags predictions
     * @name PredictionsCartList
     * @summary Получение данных корзины
     * @request GET:/api/predictions/cart
     */
    predictionsCartList: (params: RequestParams = {}) =>
      this.request<HandlerPredictionCartResponse, any>({
        path: `/api/predictions/cart`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет аномалию в черновую заявку пользователя
     *
     * @tags prediction-items
     * @name PredictionsCurrentItemsCreate
     * @summary Добавление аномалии в заявку
     * @request POST:/api/predictions/current/items
     * @secure
     */
    predictionsCurrentItemsCreate: (
      item: HandlerAddToPredictionRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerAddToPredictionResponse, HandlerErrorResponse>({
        path: `/api/predictions/current/items`,
        method: "POST",
        body: item,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает полную информацию о заявке и ее элементах
     *
     * @tags predictions
     * @name PredictionsDetail
     * @summary Получение информации о заявке
     * @request GET:/api/predictions/{id}
     * @secure
     */
    predictionsDetail: (id: number, params: RequestParams = {}) =>
      this.request<HandlerPredictionDetailResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные заявки (только для создателя и только черновые заявки)
     *
     * @tags predictions
     * @name PredictionsUpdate
     * @summary Обновление заявки
     * @request PUT:/api/predictions/{id}
     * @secure
     */
    predictionsUpdate: (
      id: number,
      prediction: HandlerUpdatePredictionRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerPredictionResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}`,
        method: "PUT",
        body: prediction,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет заявку (помечает статус как "удалён")
     *
     * @tags predictions
     * @name PredictionsDelete
     * @summary Удаление заявки
     * @request DELETE:/api/predictions/{id}
     * @secure
     */
    predictionsDelete: (id: number, params: RequestParams = {}) =>
      this.request<HandlerMessageResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Завершает или отклоняет заявку (только для модераторов)
     *
     * @tags predictions
     * @name PredictionsCompleteUpdate
     * @summary Завершение заявки модератором
     * @request PUT:/api/predictions/{id}/complete
     * @secure
     */
    predictionsCompleteUpdate: (
      id: number,
      action: HandlerCompletePredictionRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerCompletePredictionResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}/complete`,
        method: "PUT",
        body: action,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Переводит заявку из статуса "черновик" в "сформирован"
     *
     * @tags predictions
     * @name PredictionsFormUpdate
     * @summary Формирование заявки
     * @request PUT:/api/predictions/{id}/form
     * @secure
     */
    predictionsFormUpdate: (id: number, params: RequestParams = {}) =>
      this.request<HandlerPredictionResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}/form`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные элемента заявки (аномальные кольца)
     *
     * @tags prediction-items
     * @name PredictionsItemsUpdate
     * @summary Обновление элемента заявки
     * @request PUT:/api/predictions/{id}/items/{load_id}
     * @secure
     */
    predictionsItemsUpdate: (
      id: number,
      loadId: number,
      item: HandlerUpdatePredictionItemRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerUpdatePredictionItemResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}/items/${loadId}`,
        method: "PUT",
        body: item,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет аномалию из заявки
     *
     * @tags prediction-items
     * @name PredictionsItemsDelete
     * @summary Удаление элемента из заявки
     * @request DELETE:/api/predictions/{id}/items/{load_id}
     * @secure
     */
    predictionsItemsDelete: (
      id: number,
      loadId: number,
      params: RequestParams = {},
    ) =>
      this.request<HandlerMessageResponse, HandlerErrorResponse>({
        path: `/api/predictions/${id}/items/${loadId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Вход в систему с получением JWT токена
     *
     * @tags auth
     * @name UsersLoginCreate
     * @summary Аутентификация пользователя
     * @request POST:/api/users/login
     */
    usersLoginCreate: (
      credentials: HandlerLoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerLoginResponse, HandlerErrorResponse>({
        path: `/api/users/login`,
        method: "POST",
        body: credentials,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Завершение сессии пользователя с добавлением токена в blacklist
     *
     * @tags auth
     * @name UsersLogoutCreate
     * @summary Выход из системы
     * @request POST:/api/users/logout
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<HandlerMessageResponse, any>({
        path: `/api/users/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает данные авторизованного пользователя
     *
     * @tags users
     * @name UsersMeList
     * @summary Получение информации о текущем пользователе
     * @request GET:/api/users/me
     * @secure
     */
    usersMeList: (params: RequestParams = {}) =>
      this.request<HandlerUserResponse, HandlerErrorResponse>({
        path: `/api/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные текущего пользователя
     *
     * @tags users
     * @name UsersProfileUpdate
     * @summary Обновление профиля пользователя
     * @request PUT:/api/users/profile
     * @secure
     */
    usersProfileUpdate: (
      user: HandlerUpdateUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerUserResponse, HandlerErrorResponse>({
        path: `/api/users/profile`,
        method: "PUT",
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создание учетной записи пользователя
     *
     * @tags auth
     * @name UsersRegisterCreate
     * @summary Регистрация нового пользователя
     * @request POST:/api/users/register
     */
    usersRegisterCreate: (
      user: HandlerRegisterRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerUserResponse, HandlerErrorResponse>({
        path: `/api/users/register`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Проверяет подключение к Redis и работу blacklist
     *
     * @tags utils
     * @name UtilsTestRedisList
     * @summary Тестирование Redis
     * @request GET:/api/utils/test-redis
     * @secure
     */
    utilsTestRedisList: (params: RequestParams = {}) =>
      this.request<HandlerMessageResponse, any>({
        path: `/api/utils/test-redis`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
