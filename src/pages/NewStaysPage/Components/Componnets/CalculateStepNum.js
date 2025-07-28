export const CalculateStepNum = (infoStay) => {
  const {
    // Step 0 - Address
    address,
    cityId,
    provinceId,
    zipCod,
    tell,

    // Step 1 - Location
    loc,

    // Step 2 - Host Type
    typeHostLocId,
    typeHostId,
    accommodationSpaceId,

    // Step 3 - Specifications
    title,
    dics,
    allSizeOfTheInfrastructure,
    sizeOfTheInfrastructure,
    step,

    // Step 4 - Capacity
    maxCapacity,
    minCapacity,

    // Step 5 - Rooms
    room,
    bed,
    bedTwo,
    bedOld,
    bathRoom,

    // Step 6 - Amenities
    otherItemTourIds,

    // Step 8 - Documents
    fileHost,
    nationallImage,

    // Step 9 - Availability
    start,
    end,
    rolItemTourIds,

    // Step 10 - Cancellation
    CancelPercentageFirst,
    CancelPercentageSecond,
    CancelPercentageThird,

    // Step 11 - Pricing
    priceHostTourBaseSpring,

    // Step 12 - Discounts
    discountWeeky,
    discountMonth,
    discountToday,
  } = infoStay;

  // Define validation steps in order of priority
  const validationSteps = [
    // Step 0 - Address
    {
      condition: !cityId || !address || !provinceId || !tell || !zipCod,
      step: 0,
    },

    // Step 1 - Location
    {
      condition: !loc,
      step: 1,
    },

    // Step 2 - Host Type
    {
      condition: !typeHostLocId || !typeHostId || !accommodationSpaceId,
      step: 2,
    },

    // Step 3 - Specifications
    {
      condition:
        !title ||
        !dics ||
        !allSizeOfTheInfrastructure ||
        !sizeOfTheInfrastructure,
      step: 3,
    },

    // Step 4 - Capacity
    {
      condition: !minCapacity || !maxCapacity,
      step: 4,
    },

    // Step 5 - Rooms
    {
      condition:
        isNaN(room) ||
        isNaN(bed) ||
        isNaN(bedTwo) ||
        isNaN(bedOld) ||
        isNaN(bathRoom),
      step: 5,
    },

    // Step 6 - امکانات
    {
      condition: !(otherItemTourIds.length > 0),
      step: 6,
    },

    // Step 8 - Documents
    {
      condition: !fileHost || !nationallImage,
      step: 7,
    },

    // Step 9 - Availability
    {
      condition: !start || !end,
      step: 9,
    },

    // Step 10 - Cancellation
    {
      condition:
        !CancelPercentageFirst ||
        !CancelPercentageSecond ||
        !CancelPercentageThird,
      step: 10,
    },

    // Step 11 - Pricing
    {
      condition: !priceHostTourBaseSpring,
      step: 11,
    },

    // Step 12 - Discounts
    {
      condition: !discountWeeky || !discountMonth,
      step: 12,
    },
  ];
  console.log(
    "CalculateStepNum",
    infoStay
  );
  // Find the first validation step that fails
  const failedStep = validationSteps.find((step) => step.condition);

  // Return the step number or 1 (default) if all validations pass
  return failedStep ? failedStep.step : 13;
};
