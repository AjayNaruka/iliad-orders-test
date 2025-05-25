<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\Product;
use App\Entity\User;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Carbon\Carbon;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/api/v1/store-product', methods: ['POST'])]
    public function storeProduct(EntityManagerInterface $entityManager): Response
    {
        $data = array();
        try {
            $newProduct = new Product();
            $newProduct->setName('Keyboard');
            $newProduct->setPrice(10.5);

            $entityManager->persist($newProduct);
            $entityManager->flush();
        } catch (\Exception $e) {
            $data["error"] = $e->getMessage();
            return $this->json($data);
        }


        return $this->json("FINE STORE PRODUCT");
    }

    #[Route('/api/v1/list-products', methods: ['GET'])]
    public function listProducts(ProductRepository $pr): Response
    {
        $products = $pr->findAll();
        $mappedProducts = array_map(function ($product) {
            return [
                "id" => $product->getId(),
                "name" => $product->getName(),
                "description" => $product->getDescription(),
                "price" => $product->getPrice(),
                "image" => $product->getImage(),
            ];
        }, $products);

        return $this->json($mappedProducts);
    }


    #[Route('/api/v1/index-product/{id}', methods: ['GET'])]
    public function indexProduct(int $id, ProductRepository $pr): Response
    {
        $product = $pr
            ->findOneBy([
                "id" => $id
            ]);
        if ($product) {
            return new JsonResponse([
                "id" => $product->getId(),
                "name" => $product->getName(),
                "description" => $product->getDescription(),
                "price" => $product->getPrice(),
                "image" => $product->getImage(),
            ]);
        } else {
            return new JsonResponse(
                ['error' => 'Invalid product ID'],
                JsonResponse::HTTP_NOT_FOUND
            );
        }
    }

    #[Route('/api/v1/create-user', methods: ['POST'])]
    public function createUser(UserPasswordHasherInterface $hasher, EntityManagerInterface $em): Response
    {
        $user = new User();
        $user->setEmail("fapuasn@gmail.com");
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($hasher->hashPassword($user, 'password123'));

        $em->persist($user);
        $em->flush();

        return new Response('User created');
    }

    #[Route('/api/v1/user/create-order', methods: ['POST'])]
    public function createOrder(UserPasswordHasherInterface $hasher, UserRepository $ur, ProductRepository $pr, EntityManagerInterface $em, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $userMail = $this->getUser()->getUserIdentifier();
        $user = $ur->findOneBy(["email" => $userMail]);

        $product = $pr->findOneBy(["id" => $data["product_id"]]);

        if ($user && $product) {
            $order = new Order();;
            $order->setUser($user);
            $order->setProduct($product);
            $order->setCreationDate(Carbon::now()->toDateTime());

            $em->persist($order);
            $em->flush();

            return new JsonResponse([
                "order" => $order->getId()
            ]);
        } else {
            return new JsonResponse(
                ['error' => 'Invalid user or product'],
                JsonResponse::HTTP_NOT_FOUND
            );
        }
    }

    #[Route('/api/v1/user/list-orders', methods: ['GET'])]
    public function listOrders(ProductRepository $pr, UserRepository $ur, OrderRepository $or): Response
    {
        //dd("LIST ORDERS");

        $userMail = $this->getUser()->getUserIdentifier();
        $user = $ur->findOneBy(["email" => $userMail]);



        if ($user) {
            $orders = $user->getOrders();
            $mappedOrders = array_map(function ($order) {
                $product = $order->getProduct();
                return [
                    "order_id" => $order->getId(),
                    "product_name" => $product->getName(),
                    "product_price" => $product->getPrice(),
                    "creation_date" => $order->getCreationDate(),
                ];
            }, $orders->toArray());
            return new JsonResponse($mappedOrders);
        } else {
            return new JsonResponse(
                ['error' => 'Invalid user'],
                JsonResponse::HTTP_NOT_FOUND
            );
        }
    }
}
