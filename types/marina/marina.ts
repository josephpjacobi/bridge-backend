// TO DO - add types for state, zipcode
/**
 * The body of a create marina request
 */
export type Marina = {
  /**
   * The name of the marina
   */
  name: string;
  /**
   * The street address of the marina
   */
  address: string;
  /**
   * city where the marina is located
   */
  city: string;
  /**
   * The state the marina is located in
   */
  state: string;
  /**
   * Marina zip code
   */
  zipCode: string;
};

// TO DO - add type for timestamp
/**
 * The response body for a singular marina
 */
export interface MarinaApiResponse extends Marina {
  /**
   * identifier for a specific marina
   */
  id: number;
  /**
   * timestamp for the last time this record was updated
   */
  updatedAt: string;
  /**
   * timestamp for when this record was created
   */
  createdAt: string;
}
