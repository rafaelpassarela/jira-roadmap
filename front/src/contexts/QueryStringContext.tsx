import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QueryParams } from "../class/QueryParams";

interface IQueryString {
    active: boolean;
    page: number;
    perPage: number;
}

interface QueryStringParamsProps {
    navegateTo: (params: IQueryString) => void;
    getNavURL: (params?: IQueryString) => string;
    getQueryParams: () => IQueryString;
    getQueryState: () => IQueryString;
}

const QueryStringContext = createContext<QueryStringParamsProps>({} as QueryStringParamsProps);

export function useQueryStringContext(): QueryStringParamsProps {
    const context = useContext(QueryStringContext);

    if (!context) {
        throw new Error('useQueryStringContext must be used within a QueryStringContextProvider');
    }

    return context;
}

export default function QueryStringContextProvider({ children } : {children: ReactNode}) {

    const [queryParams, SetQueryParams] = useState<IQueryString>({} as IQueryString);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const getQueryParams = useCallback((): IQueryString => {
        // active
        const active: string | null = searchParams.get(QueryParams.ACTIVE);
        // page
        const page: string | null = searchParams.get(QueryParams.PAGE);
        // perPage
        const pPage: string | null = searchParams.get(QueryParams.PER_PAGE);

        return {
            active: active ? (active === '1' ? true : false) : true,
            page: page ? parseInt(page) : 1,
            perPage: pPage ? parseInt(pPage) : 10
        };
    }, [searchParams]);

    useEffect(() => {
        const val = getQueryParams();

        SetQueryParams({
            active: val.active,
            page: val.page,
            perPage: val.perPage
        });
    }, [getQueryParams]);

    const getQueryState = (): IQueryString => {
        return queryParams;
    }

    function navegateTo(params: IQueryString) {
        const aux = getNavURL(params);
        navigate(aux);
    }

    function getNavURL(params?: IQueryString): string {
        let val: IQueryString | undefined;
        if (!params) {
            val = getQueryParams();
        } else {
            val = params;
        }

        let aux = '?';
        aux += `${QueryParams.ACTIVE}=${(val.active ? '1' : '0')}&`;

        // Page
        if (val.page > 0) {
            aux += `${QueryParams.PAGE}=${val.page}&`;
        }
        // Records Per Page
        if (val.perPage > 0) {
            aux += `${QueryParams.PER_PAGE}=${val.perPage}&`;
        }
        // Remove o último caractere usando slice
        if (aux.endsWith('&')) {
            aux = aux.slice(0, -1);
        }

        return aux;
    }

    return (
        <QueryStringContext.Provider
            value={{
                navegateTo,
                getNavURL,
                getQueryParams,
                getQueryState
            }}>
            {children}
        </QueryStringContext.Provider>
    )
}
