/**
 * Single source of truth for every URL under /offerings/[offeringId]/...
 * Replaces the old per-component hardcoded "/passover-collection-2027/..." string templates.
 */

export function offeringHref(offeringId: string): string {
  return `/offerings/${offeringId}`;
}

export function programHref(offeringId: string, programId: string): string {
  return `${offeringHref(offeringId)}/programs/${programId}`;
}

export function resortHref(
  offeringId: string,
  programId: string,
  resortId: string
): string {
  return `${programHref(offeringId, programId)}/resorts/${resortId}`;
}

export function roomHref(
  offeringId: string,
  programId: string,
  resortId: string,
  roomId: string
): string {
  return `${resortHref(offeringId, programId, resortId)}/rooms/${roomId}`;
}

export function poolHref(
  offeringId: string,
  programId: string,
  resortId: string,
  poolId: string
): string {
  return `${resortHref(offeringId, programId, resortId)}/pools/${poolId}`;
}

export function restaurantHref(
  offeringId: string,
  programId: string,
  resortId: string,
  restaurantId: string
): string {
  return `${resortHref(offeringId, programId, resortId)}/restaurants/${restaurantId}`;
}

export function spaHref(
  offeringId: string,
  programId: string,
  resortId: string
): string {
  return `${resortHref(offeringId, programId, resortId)}/spa`;
}

export function experienceHref(
  offeringId: string,
  programId: string,
  experienceType: string
): string {
  return `${programHref(offeringId, programId)}/experiences/${experienceType}`;
}

export interface InquireHrefParams {
  destination: string;
  resort?: string;
  room?: string;
  dining?: string;
  pool?: string;
  topic?: string;
  service?: string;
  holiday?: string;
}

/**
 * Centralizes the /inquire?... querystring builder. Every resort/program section used to
 * hand-build this string with a hardcoded resort slug (e.g. "resort=edition") baked in —
 * this is the single place that logic now lives.
 */
export function inquireHref(params: InquireHrefParams): string {
  const search = new URLSearchParams();
  search.set("holiday", params.holiday ?? "passover-2027");
  search.set("destination", params.destination);
  if (params.resort) search.set("resort", params.resort);
  if (params.room) search.set("room", params.room);
  if (params.dining) search.set("dining", params.dining);
  if (params.pool) search.set("pool", params.pool);
  if (params.topic) search.set("topic", params.topic);
  if (params.service) search.set("service", params.service);
  return `/inquire?${search.toString()}`;
}
