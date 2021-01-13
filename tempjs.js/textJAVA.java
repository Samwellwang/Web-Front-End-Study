package com.tydic.product.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tydic.product.bo.*;
import com.tydic.product.constants.BaseContant;
import com.tydic.product.constants.RspContant;
import com.tydic.product.dao.*;
import com.tydic.product.po.*;
import com.tydic.product.service.ProductService;
import com.tydic.product.util.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private TdBDiscntMapper tdBDiscntMapper;
    @Autowired
    private TdBProductMapper tdBProductMapper;
    @Autowired
    private TdBPackageMapper tdBPackageMapper;
    @Autowired
    private TdBProductItemMapper tdBProductItemMapper;
    @Autowired
    private TdSProductlimitMapper tdSProductlimitMapper;
    @Autowired
    private TdBProductPackageMapper tdBProductPackageMapper;
    @Autowired
    private TdBPackageElementMapper tdBPackageElementMapper;

    @Override
    @Transactional
    public AddProductRspBo addProduct(AddProductReqBo addProductReqBo) throws Exception {
        AddProductRspBo addProductRspBo = new AddProductRspBo();
        log.info("=========产品新增入参={}", addProductReqBo.toString());
        BasicProdInfoBo basicInfo = addProductReqBo.getBasicInfo();
        List<ItemsInfoBo> itemsInfo = addProductReqBo.getItemsInfo();
        List<RelationInfoBo> relationInfo = addProductReqBo.getRelationInfo();
        List<DiscntInfoBo> discntInfo = addProductReqBo.getDiscntInfo();
        List<ServiceInfoBo> serviceIds = addProductReqBo.getServiceIds();
        TdBProduct product = addToProduct(basicInfo, addProductReqBo);
        TdBPackage tdBPackage = addToPackage(product);
        addToDiscntAndService(product, tdBPackage, discntInfo, serviceIds);
        if (itemsInfo != null && itemsInfo.size() > 0) {
            addToItems(itemsInfo, addProductReqBo, product);
        }
        if (relationInfo != null && relationInfo.size() > 0) {
            addToLimits(relationInfo, addProductReqBo, product);
        }
        addProductRspBo.setCode(RspContant.SUCCESS_CODE);
        addProductRspBo.setMsg(RspContant.SUCCESS_DESC);
        log.info("=========产品新增出参={}", addProductRspBo.toString());
        return addProductRspBo;
    }

    @Override
    @Transactional
    public UpdateProductRspBo updateProduct(UpdateProductReqBo updateProductReqBo) throws Exception {
        UpdateProductRspBo updateProductRspBo = new UpdateProductRspBo();
        log.info("=========产品修改入参={}", updateProductReqBo.toString());
        BasicProdInfoBo basicInfo = updateProductReqBo.getBasicInfo();
        
        List<DiscntInfoBo> discntInfo = updateProductReqBo.getDiscntInfo();
        List<ItemsInfoBo> itemsInfo = updateProductReqBo.getItemsInfo();
        List<RelationInfoBo> relationInfo = updateProductReqBo.getRelationInfo();
        List<ServiceInfoBo> serviceIds = updateProductReqBo.getServiceIds();

        TdBProduct tdBProduct = updateToProduct(basicInfo, updateProductReqBo);
        TdBPackage tdBPackage = updateToPackage(tdBProduct);
        deleteFromAll(tdBProduct.getProductId(), tdBPackage.getPackageId());
        addToDiscntAndService(tdBProduct, tdBPackage, discntInfo, serviceIds);
        if (relationInfo != null && relationInfo.size() > 0) {
            addToLimits(relationInfo, updateProductReqBo, tdBProduct);
        }
        if (itemsInfo != null && itemsInfo.size() > 0) {
            addToItems(itemsInfo, updateProductReqBo, tdBProduct);
        }
        updateProductRspBo.setMsg(RspContant.SUCCESS_CODE);
        updateProductRspBo.setCode(RspContant.SUCCESS_DESC);
        log.info("=========产品修改出参={}", updateProductRspBo.toString());
        return updateProductRspBo;
    }

    @Override
    public RspPageBO queryProductItem(ItemDefineBO itemDefineBO) {
        log.info("属性列表查询服务--产品属性,入参:{}", itemDefineBO);
        if (itemDefineBO == null) {
            return RspPageBO.buildErrorMsg("参数异常");
        }
        if (itemDefineBO.getPageNo() != 0 && itemDefineBO.getPageSize() != 0) {
            PageHelper.startPage(itemDefineBO.getPageNo(), itemDefineBO.getPageSize());
        }
        List<TdBProductItemBO> itemList = tdBProductItemMapper.selectListByInfos(itemDefineBO);
        PageInfo<TdBProductItemBO > pageInfo = new PageInfo<>(itemList);
        RspPageBO rspPageBO = new RspPageBO();
        rspPageBO.setCode(RspContant.SUCCESS_CODE);
        rspPageBO.setMsg(RspContant.SUCCESS_DESC);
        rspPageBO.setTotalCount((int)pageInfo.getTotal());
        Map<String,List<TdBProductItemBO > > map = new HashMap<>();
        map.put("itemList",itemList);
        rspPageBO.setData(map);
        log.info("属性列表查询服务--产品属性，出参 {}", rspPageBO);
        return rspPageBO;
    }

    /**
     * 产品主表的添加
     *
     * @param basicInfo
     * @param addProductReqBo
     * @return
     */
    private TdBProduct addToProduct(BasicProdInfoBo basicInfo, AddProductReqBo addProductReqBo) throws Exception {
        TdBProduct tdBProduct = new TdBProduct();
        BeanUtils.copyProperties(basicInfo, tdBProduct);
        tdBProduct.setStartDate(basicInfo.getStartDate() == null ? new Date() : basicInfo.getStartDate());
        tdBProduct.setEndDate(basicInfo.getEndDate() == null ? DateUtils.strToDate(BaseContant.DEFAULT_END_DATE, "yyyy-MM-dd HH:mm:ss") : basicInfo.getEndDate());
        tdBProduct.setCreateDate(new Date());
        tdBProduct.setProductState(BaseContant.PRODUCT_STATE_ON);
        tdBProduct.setUpdateStaffId(addProductReqBo.getStaffId());
        tdBProduct.setUpdateDepartId("");
        tdBProduct.setProvinceCode(addProductReqBo.getProvinceCode());
        log.info("产品新增,主体表po={}", tdBProduct.toString());
        int insertSelective = tdBProductMapper.insertSelective(tdBProduct);
        log.info("产品新增,主体表新增了={}条,tdBProduct={}", insertSelective, tdBProduct.toString());
        return tdBProduct;
    }

    /**
     * 产品与包关系的添加
     *
     * @param product
     * @return
     */
    private TdBPackage addToPackage(TdBProduct product) throws Exception {
        TdBPackage tdBPackage = new TdBPackage();
        BeanUtils.copyProperties(product, tdBPackage);
        tdBPackage.setPackageName(product.getProductName());
        tdBPackage.setPackageTypeCode(product.getProductTypeCode());
        tdBPackage.setPackageDesc(product.getProductExplain());
        tdBPackage.setUpdateTime(new Date());
        /* tdBPackage.setComponentId("组合id"); */
        log.info("产品新增,包定义表po={}", tdBPackage.toString());
        int insertSelective = tdBPackageMapper.insertSelective(tdBPackage);
        log.info("产品新增,包定义表新增了={}条", insertSelective);
        TdBProductPackage tdBProductPackage = new TdBProductPackage();
        BeanUtils.copyProperties(product, tdBProductPackage);
        tdBProductPackage.setUpdateTime(new Date());
        // TODO
        tdBProductPackage.setForceTag("");
        tdBProductPackage.setDefaultTag("");
        tdBProductPackage.setItemIndex(0);

        tdBProductPackage.setEparchyCode(product.getProvinceCode());
        tdBProductPackage.setProductId(product.getProductId());
        tdBProductPackage.setPackageId(tdBPackage.getPackageId());
        log.info("产品新增,包与产品关系表po={}", tdBProductPackage.toString());
        int insertSelective1 = tdBProductPackageMapper.insertSelective(tdBProductPackage);
        log.info("产品新增,包与产品关系表新增了={}条", insertSelective1);
        return tdBPackage;
    }

    /**
     * 产品业务属性的添加
     *
     * @param itemsInfos
     * @param baseReqBO
     * @param product
     */
    private void addToItems(List<ItemsInfoBo> itemsInfos, BaseReqBO baseReqBO, TdBProduct product) throws Exception {
        int insertSelective = 0;
        for (ItemsInfoBo itemsInfoBo : itemsInfos) {
            TdBProductItem tdBProductItem = new TdBProductItem();
            tdBProductItem.setProductId(product.getProductId());
            tdBProductItem.setAttrCode(itemsInfoBo.getAttrCode());
            tdBProductItem.setAttrName(itemsInfoBo.getAttrName());
            tdBProductItem.setAttrType(BaseContant.ATTR_TYPE_BUSI);
            tdBProductItem.setBusiId(itemsInfoBo.getBusiId());
            tdBProductItem.setIsSku(itemsInfoBo.getIsSku());
            tdBProductItem.setAreaCode(baseReqBO.getCityCode());
            tdBProductItem.setAttrOrigin(itemsInfoBo.getAttrOrigin());
            tdBProductItem.setAttrValue(itemsInfoBo.getAttrValue());
            tdBProductItem.setProvinceCode(baseReqBO.getProvinceCode());
            tdBProductItem.setAreaCode(baseReqBO.getCityCode());
            tdBProductItem.setUpdateStaffId(baseReqBO.getStaffId());
            tdBProductItem.setUpdateTime(new Date());
            tdBProductItem.setStartDate(product.getStartDate());
            tdBProductItem.setEndDate(product.getEndDate() == null ? DateUtils.strToDate(BaseContant.DEFAULT_END_DATE, "yyyy-MM-dd HH:mm:ss") : product.getEndDate());
            tdBProductItem.setOrder(itemsInfoBo.getOrder());
            tdBProductItem.setIsNull(StringUtils.isNotBlank(product.getNeedExp()) ? Integer.valueOf(product.getNeedExp()) : 1);
            tdBProductItem.setIsShow(itemsInfoBo.getIsShow());
            tdBProductItem.setInputType(itemsInfoBo.getInputType());
            tdBProductItem.setUpdateDepartId("");
            log.info("产品新增,产品属性表po={}", tdBProductItem.toString());
            insertSelective += tdBProductItemMapper.insertSelective(tdBProductItem);
        }
        log.info("产品新增,产品属性表新增了={}条", insertSelective);
    }

    /**
     * 产品间规则关系的添加
     *
     * @param relationInfos
     * @param baseReqBO
     * @param product
     */
    private void addToLimits(List<RelationInfoBo> relationInfos, BaseReqBO baseReqBO, TdBProduct product) throws Exception {
        int insertSelective = 0;
        for (RelationInfoBo relationInfo : relationInfos) {
            TdSProductlimit tdSProductlimit = new TdSProductlimit();
            tdSProductlimit.setStartDate(product.getStartDate() == null ? new Date() : product.getStartDate());
            tdSProductlimit.setEndDate(product.getEndDate() == null ? DateUtils.strToDate(BaseContant.DEFAULT_END_DATE, "yyyy-MM-dd HH:mm:ss") : product.getEndDate());
            tdSProductlimit.setUpdateTime(new Date());
            tdSProductlimit.setUpdateStaffId(baseReqBO.getStaffId());
            tdSProductlimit.setUpdateDepartId("");
            tdSProductlimit.setProductIdA(relationInfo.getProductIdA());
            tdSProductlimit.setProductIdB(product.getProductId());
            tdSProductlimit.setLimitTag(relationInfo.getLimitTag());
            log.info("产品新增,产品限制表po={}", tdSProductlimit.toString());
            insertSelective = tdSProductlimitMapper.insertSelective(tdSProductlimit);
        }
        log.info("产品新增,产品限制表新增了={}条", insertSelective);
    }

    /**
     * 产品构成组件的添加
     *
     * @param product
     * @param tdBPackage
     * @param discntInfo
     * @param serviceIds
     */
    private void addToDiscntAndService(TdBProduct product, TdBPackage tdBPackage,
                                       List<DiscntInfoBo> discntInfo, List<ServiceInfoBo> serviceIds) throws Exception {
        int insertSelective = 0;
        if (discntInfo != null && discntInfo.size() > 0) {
            for (DiscntInfoBo discntInfoBo : discntInfo) {
                TdBDiscnt tdBDiscnt = new TdBDiscnt();
                BeanUtils.copyProperties(discntInfoBo, tdBDiscnt);
                tdBDiscnt.setEndDate(product.getEndDate() == null ? DateUtils.strToDate(BaseContant.DEFAULT_END_DATE, "yyyy-MM-dd HH:mm:ss") : product.getEndDate());
                tdBDiscnt.setStartDate(product.getStartDate() == null ? new Date() : product.getStartDate());
                tdBDiscnt.setUpdateStaffId(product.getUpdateStaffId());
                tdBDiscnt.setEnableTag(discntInfoBo.getEnableTag());
                tdBDiscnt.setUpdateDepartId("");
                tdBDiscnt.setUpdateTime(new Date());
                log.info("产品新增,产品资费表po={}", tdBDiscnt.toString());
                insertSelective += tdBDiscntMapper.insertSelective(tdBDiscnt);
                log.info("产品新增,产品资费表新增了={}条", insertSelective);
                discntInfoBo.setDiscntCode(tdBDiscnt.getDiscntCode());
            }
            List<Integer> discntIds = discntInfo.stream().map(DiscntInfoBo::getDiscntCode).collect(Collectors.toList());
            addToElement(product, discntIds, tdBPackage.getPackageId(), BaseContant.ELEMENT_TYPE_DISCNT);
        }
        if (serviceIds != null && serviceIds.size() > 0) {
            List<Integer> serviceList = serviceIds.stream().map(ServiceInfoBo::getServiceId).collect(Collectors.toList());

            addToElement(product, serviceList, tdBPackage.getPackageId(), BaseContant.ELEMENT_TYPE_SERVICE);
        }
    }

    /**
     * 包与元素关系的添加
     *
     * @param product
     * @param elementIds
     * @param packageId
     * @param elementType
     */
    private void addToElement(TdBProduct product, List<Integer> elementIds, Integer packageId, String elementType) throws Exception {
        int insertSelective = 0;
        for (Integer elementId : elementIds) {
            TdBPackageElement tdBPackageElement = new TdBPackageElement();
            BeanUtils.copyProperties(product, tdBPackageElement);
            // TODO
            tdBPackageElement.setForceTag("");
            tdBPackageElement.setDefaultTag("");
            tdBPackageElement.setItemIndex(0);

            tdBPackageElement.setElementTypeCode(elementType);
            tdBPackageElement.setElementId(elementId);
            tdBPackageElement.setUpdateTime(new Date());
            tdBPackageElement.setPackageId(packageId);
            log.info("产品新增,包与元素关系表po={}", tdBPackageElement.toString());
            insertSelective += tdBPackageElementMapper.insertSelective(tdBPackageElement);
        }
        log.info("产品新增,包与元素关系表新增了={}条", insertSelective);
    }

    /**
     * 更新产品主表
     *
     * @param basicInfo
     * @param updateProductReqBo
     * @return
     * @throws Exception
     */
    private TdBProduct updateToProduct(BasicProdInfoBo basicInfo, UpdateProductReqBo updateProductReqBo) throws Exception {
        TdBProduct tdBProduct = new TdBProduct();
        BeanUtils.copyProperties(basicInfo, tdBProduct);
        tdBProduct.setUpdateTime(new Date());
        tdBProduct.setUpdateStaffId(updateProductReqBo.getStaffId());
        tdBProduct.setUpdateDepartId("");
        int selective = tdBProductMapper.updateByPrimaryKeySelective(tdBProduct);
        if (selective < 1) {
            throw new Exception("查无此产品");
        }
        return tdBProduct;
    }

    /**
     * 更新产品包
     *
     * @param tdBProduct
     * @return
     * @throws Exception
     */
    private TdBPackage updateToPackage(TdBProduct tdBProduct) throws Exception {
        Integer productId = tdBProduct.getProductId();
        TdBPackage tdBPackage = tdBPackageMapper.selectByProductId(productId);
        if (tdBPackage != null) {
            BeanUtils.copyProperties(tdBProduct, tdBPackage);
            tdBPackage.setPackageName(tdBProduct.getProductName());
            tdBPackage.setPackageDesc(tdBProduct.getProductExplain());
            tdBPackage.setPackageTypeCode(tdBProduct.getProductTypeCode());
            tdBPackage.setUpdateTime(new Date());
            /* tdBPackage.setComponentId("组合id"); */
            tdBPackageMapper.updateByPrimaryKeySelective(tdBPackage);
        } else {
            tdBProductMapper.deleteByPrimaryKey(productId);
            throw new Exception("查无此产品");
        }
        return tdBPackage;
    }

    /**
     * 更新前移除产品属性,组件,规则关系等
     *
     * @param productId
     * @param packageId
     * @throws Exception
     */
    private void deleteFromAll(Integer productId, Integer packageId) throws Exception {
        tdBProductItemMapper.deleteByProductId(productId);
        List<TdSProductlimit> tdSProductlimit = tdSProductlimitMapper.selectByProductIdB(productId);
        if (tdSProductlimit != null && tdSProductlimit.size() > 0) {
            for (TdSProductlimit sProductlimit : tdSProductlimit) {
                tdSProductlimitMapper.deleteByPrimaryKey(new TdSProductlimitKey
                        (sProductlimit.getProductIdA(), sProductlimit.getProductIdB(), sProductlimit.getLimitTag()));
            }
        }
        List<TdBPackageElement> tdBPackageElements = tdBPackageElementMapper.selectAllByPackageId(packageId);
        if (tdBPackageElements != null && tdBPackageElements.size() > 0) {
            for (TdBPackageElement element : tdBPackageElements) {
                if (BaseContant.ELEMENT_TYPE_DISCNT.equals(element.getElementTypeCode())) {
                    tdBDiscntMapper.deleteByPrimaryKey(element.getElementId());
                }
                tdBPackageElementMapper.deleteByPrimaryKey(new TdBPackageElementKey(packageId,
                        element.getElementTypeCode(), element.getElementId()));
            }
        }
    }
}

