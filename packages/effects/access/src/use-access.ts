import { computed } from 'vue';

import { preferences, updatePreferences } from '@vben-core/preferences';
import { useCoreAccessStore } from '@vben-core/stores';

function useAccess() {
  const coreAccessStore = useCoreAccessStore();
  const accessMode = computed(() => {
    return preferences.app.accessMode;
  });

  /**
   * 基于角色判断是否有权限
   * @description: Determine whether there is permission，The role is judged by the user's role
   * @param roles
   */
  function hasAuthByRoles(roles: string[]) {
    const userRoleSet = new Set(coreAccessStore.userRoles);
    const intersection = roles.filter((item) => userRoleSet.has(item));
    return intersection.length > 0;
  }

  /**
   * 基于权限码判断是否有权限
   * @description: Determine whether there is permission，The permission code is judged by the user's permission code
   * @param codes
   */
  function hasAuthByCodes(codes: string[]) {
    const userCodesSet = new Set(coreAccessStore.accessCodes);

    const intersection = codes.filter((item) => userCodesSet.has(item));
    return intersection.length > 0;
  }

  async function toggleAccessMode() {
    updatePreferences({
      app: {
        accessMode:
          preferences.app.accessMode === 'frontend' ? 'backend' : 'frontend',
      },
    });
  }

  return {
    accessMode,
    hasAuthByCodes,
    hasAuthByRoles,
    toggleAccessMode,
  };
}

export { useAccess };