const mapping: Record<string, string> = {
  companies: 'company',
  contractors: 'contractor',
  employees: 'employee',
  'hr-managers': 'hr_manager',
  teams: 'team',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
