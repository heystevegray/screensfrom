/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ShowsIndexImport } from './routes/shows/index'
import { Route as ShowsShowIdImport } from './routes/shows/$showId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ShowsIndexRoute = ShowsIndexImport.update({
  id: '/shows/',
  path: '/shows/',
  getParentRoute: () => rootRoute,
} as any)

const ShowsShowIdRoute = ShowsShowIdImport.update({
  id: '/shows/$showId',
  path: '/shows/$showId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/shows/$showId': {
      id: '/shows/$showId'
      path: '/shows/$showId'
      fullPath: '/shows/$showId'
      preLoaderRoute: typeof ShowsShowIdImport
      parentRoute: typeof rootRoute
    }
    '/shows/': {
      id: '/shows/'
      path: '/shows'
      fullPath: '/shows'
      preLoaderRoute: typeof ShowsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/shows/$showId': typeof ShowsShowIdRoute
  '/shows': typeof ShowsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/shows/$showId': typeof ShowsShowIdRoute
  '/shows': typeof ShowsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/shows/$showId': typeof ShowsShowIdRoute
  '/shows/': typeof ShowsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/shows/$showId' | '/shows'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/shows/$showId' | '/shows'
  id: '__root__' | '/' | '/shows/$showId' | '/shows/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ShowsShowIdRoute: typeof ShowsShowIdRoute
  ShowsIndexRoute: typeof ShowsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ShowsShowIdRoute: ShowsShowIdRoute,
  ShowsIndexRoute: ShowsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/shows/$showId",
        "/shows/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/shows/$showId": {
      "filePath": "shows/$showId.tsx"
    },
    "/shows/": {
      "filePath": "shows/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
