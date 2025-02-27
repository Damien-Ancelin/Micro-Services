import type { TRouteConfig  } from "../@types";

enum Role {
  ADMIN = 1,
  USER = 2,
}

export const routeConfig = {
  "/users": {
    "GET" : [Role.ADMIN, Role.USER]
  },
  
  "/posts": {
    "GET": [Role.ADMIN, Role.USER]
  },
} as TRouteConfig;