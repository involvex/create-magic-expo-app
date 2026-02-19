/**
 * Navigation hooks for Magic Expo apps.
 */

import { useRouter, useSegments, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

/**
 * Enhanced useRouter hook with typed navigation.
 */
export function useTypedRouter() {
  const router = useRouter();

  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    dismiss: router.dismiss,
    dismissAll: router.dismissAll,
    canGoBack: router.canGoBack,
  };
}

/**
 * Hook to protect routes based on authentication.
 *
 * @example
 * ```tsx
 * import { useProtectedRoute } from '@magic-expo/navigation';
 * import { useAuth } from './hooks/useAuth';
 *
 * export default function Layout() {
 *   const { isAuthenticated } = useAuth();
 *   useProtectedRoute(isAuthenticated, '/login');
 *
 *   return <Slot />;
 * }
 * ```
 */
export function useProtectedRoute(
  isAuthenticated: boolean,
  redirectPath = "/login",
) {
  const segments = useSegments();
  const router = useTypedRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, segments, router]);
}

/**
 * Hook to get typed search params.
 */
export function useTypedParams<T extends Record<string, string | string[]>>() {
  return useLocalSearchParams() as unknown as T;
}

/**
 * Hook for navigation with loading states.
 */
export function useNavigationWithLoading() {
  const router = useTypedRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = async (
    href: string,
    action: "push" | "replace" = "push",
  ) => {
    setIsLoading(true);
    try {
      if (action === "push") {
        router.push(href);
      } else {
        router.replace(href);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigate,
    isLoading,
    ...router,
  };
}

// Import React for useState
import React from "react";
