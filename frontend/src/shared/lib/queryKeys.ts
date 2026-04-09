export const queryKeys = {
  auth: { me: ['auth', 'me'] },

  snippets: {
    all: ['snippets'],

    lists: () => [...queryKeys.snippets.all, 'list'],
    detail: (id: string) => [...queryKeys.snippets.all, id],
    search: (query: string) => [...queryKeys.snippets.all, 'search', query],
  },
};
